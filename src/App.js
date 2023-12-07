import "./App.css";
import { useContext } from "react";
import LandingPage from "./layouts/landingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultNavbar from "./components/navbar";
import Dashboard from "./layouts/dashboard.js";
import Login from "./layouts/login";
import Register from "./layouts/register";
import CreateData from "./layouts/createData";
import EditData from "./layouts/editData";
import { AuthProvider, AuthContext } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/protectedRoute";
import Profile from "./layouts/profile";
import DetailJob from "./layouts/jobDetail";


const App = () => {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <DefaultNavbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/job-detail" element={<DetailJob />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard/list-job-vacancy"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/list-job-vacancy/create"
              element={<ProtectedRoute>
                <CreateData />
                </ProtectedRoute>}
            />
            <Route
              path="/dashboard/list-job-vacancy/edit"
              element={<ProtectedRoute>
                <EditData />
                </ProtectedRoute>}
            />
            <Route
              path="/dashboard/profile"
              element={<ProtectedRoute>
                <Profile />
                </ProtectedRoute>}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
