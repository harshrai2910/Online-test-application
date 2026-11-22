const express = require("express");
const testRouter = express.Router();

const testController = require("../controller/testController");

testRouter.get("/send", testController.sendQuestions);
testRouter.post("/verify", testController.verifyResult);
testRouter.get("/history", testController.testHistory);

module.exports = testRouter;
