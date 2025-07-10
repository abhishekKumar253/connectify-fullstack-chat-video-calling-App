import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { resetPassword } from "../lib/api";
import { ShipWheelIcon } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully. You can now log in.");
      navigate("/login");
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

          <h2 className="text-2xl font-semibold mb-1">Reset Password</h2>
          <p className="text-sm opacity-70 mb-6">
            Enter a new password to regain access to your account.
          </p>

          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>

            <p className="text-sm text-center mt-2">
              Know your password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>

        {/* Right - Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center p-10">
          <div className="max-w-sm text-center space-y-4">
            <img
              src="/i.png"
              alt="Reset Illustration"
              className="rounded-xl shadow-lg w-full h-auto"
            />
            <div>
              <h2 className="text-xl font-semibold">Set a new password</h2>
              <p className="text-sm opacity-70">
                Create a strong and secure password to protect your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
