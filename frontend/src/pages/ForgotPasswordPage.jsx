import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { forgotPassword } from "../lib/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await forgotPassword({ email });
      toast.success("Password reset link sent to your email.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4"
      data-theme="forest">
      <div className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6">
            <ShipWheelIcon className="size-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-wider">
              Connectify
            </h1>
          </div>

          <h2 className="text-2xl font-semibold mb-1">Forgot Password</h2>
          <p className="text-sm opacity-70 mb-6">
            Enter your registered email address. We’ll send you a reset link.
          </p>

          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="hello@example.com"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p className="text-sm text-center mt-2">
              Remembered your password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Go back to login
              </Link>
            </p>
          </form>
        </div>

        {/* Right - Image */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center p-10">
          <div className="max-w-sm text-center space-y-4">
            <img
              src="/i.png"
              alt="Password Reset Illustration"
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div>
              <h2 className="text-xl font-semibold">
                Reset your password easily
              </h2>
              <p className="text-sm opacity-70">
                A link will be sent to your email to create a new password.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
