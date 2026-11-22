import { useForm } from "react-hook-form";
import { signupFromServer } from "../../services/authLinkServices";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const nameRefErr = useRef(null);
  const emailRefErr = useRef(null);
  const passRefErr = useRef(null);
  const confirmPassRefErr = useRef(null);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.name.trim().length < 4) {
      nameRefErr.current.style.display = "block";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      emailRefErr.current.style.display = "block";
      return;
    }

    if (data.password.trim().length < 6) {
      passRefErr.current.style.display = "block";
      return;
    }

    if (data.password.trim() != data.confirmPassword.trim()) {
      confirmPassRefErr.current.style.display = "block";
      return;
    }

    const result = await signupFromServer(data);

    if (result.signup) {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="mt-20 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full max-w-md bg-white p-8 rounded-xl shadow-sm border"
        >
          <div className="mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to get started.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="border rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
            />
            <p ref={nameRefErr} className="h-4 text-xs text-red-500 hidden">
              name must contain 5 characters
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="border rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
            />
            <p ref={emailRefErr} className="h-4 text-xs text-red-500 hidden">
              email is not valid
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              className="border rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
            />
            <p ref={passRefErr} className="h-4 text-xs text-red-500 hidden">
              password must contain 6 characters
            </p>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className="border rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
            />
            <p
              ref={confirmPassRefErr}
              className="h-4 text-xs text-red-500 hidden"
            >
              password doesn't match
            </p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};
