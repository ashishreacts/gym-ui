import { Route, Routes, useNavigate } from "react-router-dom";
import { CreatePlan } from "../components/CreatePlan";
import { PlanListPage } from "../components/PlanListPage";

export const PlanRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="" element={<PlanListPage />} />
      <Route
        path="create"
        element={<CreatePlan onSuccess={() => navigate("/app/plans")} />}
      />
    </Routes>
  );
};
