import { AuthRoutes } from "@/features/auth";
import { Typography } from "@mui/material";
import { RouteObject } from "react-router-dom";

export const PublicRoutes: RouteObject[] = [
  {
    path: "",
    element: <Typography variant="h1">Welcome!</Typography>,
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
