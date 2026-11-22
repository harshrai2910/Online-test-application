import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import { Loader } from "./components/loader";
import { LandingPage } from "./components/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const readSession = (key, fallback) => {
    try {
      const saved = sessionStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      sessionStorage.removeItem(key);
      return fallback;
    }
  };

  // inside App()
  const [Questions, setQuestions] = useState(() =>
    readSession("testQuestions", []),
  );
  const [testStartTime, setTestStartTime] = useState(() =>
    readSession("testStartTime", null),
  );
  const [TestResult, setTestResult] = useState(() =>
    readSession("testResult", []),
  );

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    authStatus()
      .then((res) => {
        setIsLoggedIn(!!res.isLoggedIn);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  const handleStartTest = async () => {
    const questions = await testQuestionsFromServer();

    const startTime = Date.now();

    sessionStorage.setItem("testQuestions", JSON.stringify(questions));
    sessionStorage.setItem("testStartTime", startTime.toString());

    setQuestions(questions);
    setTestStartTime(startTime);

    navigate("/test/questions");
  };

  const finishTest = (result) => {
    sessionStorage.setItem("testResult", JSON.stringify(result));
    sessionStorage.removeItem("testQuestions");
    sessionStorage.removeItem("selectedAnswers");
    sessionStorage.removeItem("testStartTime");

    setTestResult(result);
    setQuestions([]);
    setTestStartTime(null);
  };

  const handleLogout = () => {
    logoutFromServer().then(() => {
      sessionStorage.removeItem("testQuestions");
      sessionStorage.removeItem("selectedAnswers");
      sessionStorage.removeItem("testStartTime");

      setIsLoggedIn(false);
      navigate("/login");
    });
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/" element={<LandingPage />} />

        <Route
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} authLoading={authLoading} />
          }
        >
          <Route
            path="/test"
            element={<StartTest handleStartTest={handleStartTest} />}
          />
          <Route
            path="/test/questions"
            element={
              <TestQuestions
                Questions={Questions}
                testStartTime={testStartTime}
                finishTest={finishTest}
              />
            }
          />
          <Route
            path="/test/result"
            element={<Result TestResult={TestResult} />}
          />

          <Route path="/test/history" element={<History />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
