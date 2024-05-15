import { Route, Routes } from "react-router-dom";
import { BatchListPage } from "../components/BatchListPage";
import { CreateBatch } from "../components/CreateBatch";

// TODO: update route name
export const BatchRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<BatchListPage />} />
      <Route
        path="create"
        element={<CreateBatch onSuccess={() => console.log("")} />}
      />
    </Routes>
  );
};
