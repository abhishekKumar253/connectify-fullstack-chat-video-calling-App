import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <button onClick={() => toast.success("Success!")}>Success</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
