import { Route, Routes } from "react-router-dom";
import { PlanList } from "../components/PlanList";

export const PlanRoutes = () => {
  return (
    <Routes>
      <Route path="path" element={<PlanList />} />
    </Routes>
  );
};
