import { Route, Routes } from "react-router-dom";
import { BatchList } from "../components/BatchList";

// TODO: update route name
export const BatchRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<BatchList />} />
    </Routes>
  );
};
