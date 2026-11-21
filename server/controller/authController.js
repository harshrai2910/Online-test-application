const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.postSignup = [
  check("name").trim().min(4).withMessage("Should contain at least 5 char"),
  check("email").trim().isEmail().withMessage("enter a valid email"),

  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 chars"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password dosen't match");
      }
      return true;
    }),

  async (req, res, next) => {
    const { name, email, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array().map((err) => err) });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (!err) {
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        await user.save();
        return res.json({ signup: true });
      }
      return res.json({ signup: false });
    });
  },
];

exports.postLogin = async (req, res, _) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ msg: "email/username or password dosen't match!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ msg: "email/username or password dosen't match!" });
  }

  req.session.isLoggedIn = true;
  req.session.user = {
    userId: user._id.toString(),
  };
  return res.status(200).json({ isLoggedIn: true });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("connect.sid").json({ msg: "logout successfully" });
  });
};
