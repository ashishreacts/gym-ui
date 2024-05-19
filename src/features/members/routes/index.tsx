import { Route, Routes } from "react-router-dom";
import { CreateMember } from "../components/CreateMember";
import { MemberList } from "../components/MemberList";

// TODO: update route name
export const MemberRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MemberList />} />
      <Route path="create" element={<CreateMember onSuccess={() => true} />} />
    </Routes>
  );
};
