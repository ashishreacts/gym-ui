import { AuthRoutes } from "@/features/auth";
import { Navigate, RouteObject } from "react-router-dom";

export const PublicRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="/auth/login" />,
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
