import { useForm } from "react-hook-form";
import { loginFromServer } from "../../services/authLinkServices";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const matchRefErr = useRef(null);
  const onSubmit = async (data) => {
    matchRefErr.current.style.display = "hidden";

    console.log(data);
    const result = await loginFromServer(data);
    if (!result.isLoggedIn) {
      matchRefErr.current.style.display = "block";
      return;
    }

    navigate("/test");
  };
  return (
    <>
      <div className="flex justify-center items-center py-10 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-sm border rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold">Login</h2>

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              {...register("email")}
              type="email"
              className="border rounded px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label>Password</label>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="border rounded px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
            </button>
            <p ref={matchRefErr} className="h-4 text-xs text-red-500 hidden">
              Email/password does't match
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
