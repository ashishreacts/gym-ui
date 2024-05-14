import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={<Login onSuccess={() => console.log("success")} />}
      />
      <Route
        path="signup"
        element={<Signup onSuccess={() => console.log("success")} />}
      />
    </Routes>
  );
};
