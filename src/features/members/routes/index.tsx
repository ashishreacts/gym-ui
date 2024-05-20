import { Route, Routes } from "react-router-dom";
import { CreateMember } from "../components/CreateMember";
import { MemberListPage } from "../components/MemberListPage";
import { UpdateMember } from "../components/UpdateMember";

// TODO: update route name
export const MemberRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<MemberListPage />} />
      <Route path="create" element={<CreateMember onSuccess={() => true} />} />
      <Route
        path=":id/edit"
        element={<UpdateMember onSuccess={() => true} />}
      />
    </Routes>
  );
};
