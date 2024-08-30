import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Client from "./pages/Client/Client";
import Admin from "./pages/Admin/Admin";
import Map from "./components/Map";
import Register from "./pages/Register/Register";
import TrainsPage from "./pages/Client/TrainsPage";
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

function ProtectedRoute({ children, adminOnly }) {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <p>You do not have permission to access this page...</p>
        <div>
          Try to{" "}
          <span
            className="text-sm text-blue-500 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <p>You need admin privileges to access this page...</p>
        <div>
          Go{" "}
          <span
            className="text-sm text-blue-500 font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            back
          </span>
        </div>
      </div>
    );
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/track-trains" element={<TrainsPage />} />
        <Route path="/track-trains/:id" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
