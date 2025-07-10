import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4"
      data-theme="forest">
      <div className="w-full max-w-6xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <ShipWheelIcon className="size-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-wider">
              Connectify
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-1">Welcome Back</h2>
          <p className="text-sm opacity-70 mb-6">
            Sign in to continue your language learning adventure!
          </p>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>
                {error?.response?.data?.message || "Something went wrong."}
              </span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              className="input input-bordered w-full"
              value={loginData.identifier}
              onChange={(e) =>
                setLoginData({ ...loginData, identifier: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />

            {/* Forgot Password Link */}
            <div className="text-right text-sm mb-2">
              <Link
                to="/forgot-password"
                className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Redirect to Sign Up */}
            <p className="text-center text-sm mt-2">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2  bg-primary/10 items-center justify-center p-10">
          <div className="max-w-sm text-center space-y-4">
            <img
              src="/i.png"
              alt="Language Illustration"
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div>
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-sm opacity-70">
                Practice conversations, make friends, and improve your language
                skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
