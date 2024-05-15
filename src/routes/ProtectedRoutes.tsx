import { BatchRoutes } from "@/features/batches";
import { PlanRoutes } from "@/features/plans";
import { Navigate, RouteObject } from "react-router-dom";
import { MainLayoutWrapper } from "./MainLayoutWrapper";

export const ProtectedRoutes: RouteObject[] = [
  {
    path: "/app",
    element: <MainLayoutWrapper />,
    children: [
      { path: "", element: <Navigate to="/app/plans" /> }, // Redirect /app to /app/plans
      { path: "/app/plans/*", element: <PlanRoutes /> },
      { path: "", element: <Navigate to="/app/batches" /> }, // Redirect /app to /app/batches
      { path: "/app/batches/*", element: <BatchRoutes /> },
    ],
  },
];
