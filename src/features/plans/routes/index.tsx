import { Route, Routes, useNavigate } from "react-router-dom";
import { CreatePlan } from "../components/CreatePlan";
import { PlanList } from "../components/PlanList";

export const PlanRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="" element={<PlanList />} />
      <Route
        path="create"
        element={<CreatePlan onSuccess={() => navigate("/app/plans")} />}
      />
    </Routes>
  );
};
