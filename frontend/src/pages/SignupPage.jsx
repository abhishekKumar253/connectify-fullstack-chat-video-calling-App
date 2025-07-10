import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();

    signupMutation(signupData, {
      onSuccess: () => {
        toast.success("Signup successful! Please verify your email.");
        navigate("/verify-email");
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4"
      data-theme="forest">
      <div className="w-full max-w-6xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Signup Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <ShipWheelIcon className="size-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-wider">
              Connectify
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-1">Create an Account</h2>
          <p className="text-sm opacity-70 mb-6">
            Join Connectify and start your language learning adventure!
          </p>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>
                {error?.response?.data?.message || "Something went wrong."}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              value={signupData.fullName}
              onChange={(e) =>
                setSignupData({ ...signupData, fullName: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="johndoe"
              className="input input-bordered w-full"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="input input-bordered w-full"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />
            <div>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <p className="text-xs opacity-60 mt-1 ml-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mt-1"
                required
              />
              <span>
                I agree to the{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  privacy policy
                </span>
              </span>
            </label>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Redirect */}
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center p-10">
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

export default SignUpPage;
