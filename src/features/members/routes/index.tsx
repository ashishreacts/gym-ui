import { MemberList } from "../components/MemberList";
import { Route, Routes } from "react-router-dom";

// TODO: update route name
export const MemberRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MemberList />} />
    </Routes>
  );
};
