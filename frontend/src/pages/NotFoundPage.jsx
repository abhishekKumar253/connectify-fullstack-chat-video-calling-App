import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-base-200">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2 text-white bg-primary hover:bg-primary/90 rounded-full transition">
        <ArrowLeftCircle className="size-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
