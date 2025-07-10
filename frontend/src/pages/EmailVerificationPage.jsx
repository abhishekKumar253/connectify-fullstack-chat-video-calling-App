import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BadgeCheckIcon } from "lucide-react";
import useVerifyEmail from "../hooks/useVerifyEmail";
import useAuthUser from "../hooks/useAuthUser";

const EmailVerificationPage = () => {
  const [code, setCode] = useState("");
  const { verifyEmailMutation, isPending, error } = useVerifyEmail();
  const navigate = useNavigate();
  const { authUser } = useAuthUser();

  useEffect(() => {
    if (authUser?.isVerified) {
      navigate("/onboarding");
    }
  }, [authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmailMutation({ code });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-black px-4"
      data-theme="forest">
      <div className="w-full max-w-md bg-base-100 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <BadgeCheckIcon className="size-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary tracking-wide font-mono">
            Email Verification
          </h1>
          <p className="text-sm opacity-70">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error text-sm shadow-sm">
            <span>
              {error?.response?.data?.message || "Invalid or expired code."}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="123456"
            className="input input-bordered input-lg w-full text-center tracking-widest text-lg transition-all focus:scale-[1.02]"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button
            className="btn btn-primary w-full text-base"
            type="submit"
            disabled={isPending}>
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm">
          Already verified?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
