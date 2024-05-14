import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={<Login onSuccess={() => console.log("success")} />}
      />
    </Routes>
  );
};
