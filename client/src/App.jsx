import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { Signup } from "./components/auth/Signup";
import { Login } from "./components/auth/Login";
import { Navbar } from "./components/navigation/Navbar";
import { useEffect, useState } from "react";
import { authStatus, logoutFromServer } from "./services/authLinkServices";
import { StartTest } from "./components/Test/StartTest";
import { TestQuestions } from "./components/Test/TestQuestions";
import { testQuestionsFromServer } from "./services/testLinkServices";
import { Result } from "./components/Test/Result";
import { History } from "./components/Test/History";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Questions, setQuestions] = useState([]);
  const [TestResult, setTestResult] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  useEffect(() => {
    authStatus().then((res) => {
      if (res.isLoggedIn) {
        setIsLoggedIn(true);
      }
    });
  });

  const handleStartTest = async () => {
    await testQuestionsFromServer().then((data) => {
      setQuestions(data);
    });
  };

  const handleLogout = () => {
    logoutFromServer().then(() => {
      setIsLoggedIn(false);
      navigate("/login");
    });
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              path="/test"
              element={<StartTest handleStartTest={handleStartTest} />}
            />
            <Route
              path="/test/questions"
              element={
                <TestQuestions
                  Questions={Questions}
                  setTestResult={setTestResult}
                />
              }
            />
            <Route
              path="/test/result"
              element={<Result TestResult={TestResult} />}
            />

            <Route path="/test/history" element={<History />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
