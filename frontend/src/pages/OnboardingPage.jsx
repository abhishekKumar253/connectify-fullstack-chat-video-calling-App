import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully 🎉");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] px-4 py-8 font-sans overflow-hidden">
      <div className="w-full max-w-3xl h-[90vh] overflow-y-auto bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-10 backdrop-blur-md relative">
        {/* Glow Behind Avatar */}
        <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 w-72 h-72 bg-primary rounded-full blur-3xl opacity-20 z-0"></div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-2 z-10 relative text-white">
          👋 Welcome, {authUser?.username || "friend"}!
        </h1>
        <p className="text-center text-sm opacity-70 mb-6 z-10 relative text-gray-300">
          Let’s create your profile and match you with ideal language partners.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative size-32 rounded-full border-4 border-primary shadow-lg overflow-hidden transition hover:scale-105 duration-300">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white opacity-50">
                  <CameraIcon className="size-12" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="btn btn-outline btn-accent btn-sm">
              <ShuffleIcon className="size-4 mr-2" />
              Generate Avatar
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="text-gray-300 font-medium block mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-neutral text-white placeholder:text-gray-400"
              placeholder="Your full name"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-gray-300 font-medium block mb-1">Bio</label>
            <textarea
              className="textarea textarea-bordered w-full bg-neutral text-white placeholder:text-gray-400"
              rows="3"
              placeholder="Tell something about yourself..."
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
            />
          </div>

          {/* Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 font-medium block mb-1">
                Native Language
              </label>
              <select
                className="select select-bordered w-full bg-neutral text-white"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    nativeLanguage: e.target.value,
                  })
                }
                required>
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-300 font-medium block mb-1">
                Learning Language
              </label>
              <select
                className="select select-bordered w-full bg-neutral text-white"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    learningLanguage: e.target.value,
                  })
                }
                required>
                <option value="">Select language you're learning</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learn-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-gray-300 font-medium block mb-1">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 opacity-70 text-white" />
              <input
                type="text"
                className="input input-bordered pl-10 w-full bg-neutral text-white placeholder:text-gray-400"
                placeholder="City, Country"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="btn bg-gradient-to-r from-primary to-secondary border-none text-white w-full text-base font-semibold hover:brightness-110 transition duration-300">
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin size-5 mr-2" />
                Onboarding...
              </>
            ) : (
              <>
                <ShipWheelIcon className="size-5 mr-2" />
                Complete Onboarding
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
