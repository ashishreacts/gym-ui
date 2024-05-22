import { Authenticator } from "@/features/auth";
import { BatchRoutes } from "@/features/batches";
import { GymRoutes } from "@/features/gym";
import { MemberRoutes } from "@/features/members";
import { PlanRoutes } from "@/features/plans";
import { Navigate, RouteObject } from "react-router-dom";
import { MainLayoutWrapper } from "./MainLayoutWrapper";

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
      { path: "/app/batches/*", element: <BatchRoutes /> },
      { path: "/app/gym/*", element: <GymRoutes /> },
      { path: "/app/member/*", element: <MemberRoutes /> },
    ],
  },
];
