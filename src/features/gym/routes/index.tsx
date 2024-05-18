import { Route, Routes } from "react-router-dom";
import { CreateGym } from "../components/CreateGym";
import { GymListPage } from "../components/GymListPage";

// TODO: update route name
export const GymRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<GymListPage />} />
      <Route path="create" element={<CreateGym onSuccess={() => true} />} />
    </Routes>
  );
};
