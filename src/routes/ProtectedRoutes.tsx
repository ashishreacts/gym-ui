import { Authenticator } from "@/features/auth";
import { BatchRoutes } from "@/features/batches";
import { GymRoutes } from "@/features/gym";
import { PlanRoutes } from "@/features/plans";
import { Navigate, RouteObject } from "react-router-dom";
import { MainLayoutWrapper } from "./MainLayoutWrapper";
import { MemberRoutes } from "@/features/members";

export const ProtectedRoutes: RouteObject[] = [
  {
    path: "/app",
    element: (
      <Authenticator>
        <MainLayoutWrapper />
      </Authenticator>
    ),
    children: [
      { path: "", element: <Navigate to="/app/plans" /> }, // Redirect /app to /app/plans
      { path: "/app/plans/*", element: <PlanRoutes /> },
      { path: "", element: <Navigate to="/app/batches" /> }, // Redirect /app to /app/batches
      { path: "/app/batches/*", element: <BatchRoutes /> },
      { path: "", element: <Navigate to="/app/gym" /> }, // Redirect /app to /app/gym
      { path: "/app/gym/*", element: <GymRoutes /> },
      { path: "", element: <Navigate to="/app/member" /> }, // Redirect /app to /app/member
      { path: "/app/member/*", element: <MemberRoutes /> },
    ],
  },
];
