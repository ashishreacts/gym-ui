import storage from "@/utils/storage";
import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const Authenticator: React.FC<Props> = ({ children }) => {
  const token = storage.getToken();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};
