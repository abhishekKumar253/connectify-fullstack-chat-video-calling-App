import { useLocation, Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  ShipWheelIcon,
  UsersIcon,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useState } from "react";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo (chat page only) */}
          {isChatPage && (
            <Link to="/" className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Connectify
              </span>
            </Link>
          )}

          {/* Hamburger Menu (Mobile only) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop icons */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
            <ThemeSelector />
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}>
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-base-100 z-40 border-t border-base-300 shadow-md">
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2">
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              to="/friends"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Friends
            </Link>
            <Link
              to="/notifications"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2">
              <BellIcon className="h-5 w-5" />
              Notifications
            </Link>
          </div>

          {/* Profile + Theme + Logout in Drawer */}
          <div className="border-t border-base-300 pt-4 mt-2 flex items-center justify-between px-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={authUser?.profilePic} alt="User Avatar" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">{authUser?.fullName}</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeSelector />
              <button
                className="btn btn-ghost btn-circle"
                onClick={logoutMutation}>
                <LogOutIcon className="h-5 w-5 text-base-content opacity-70" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
