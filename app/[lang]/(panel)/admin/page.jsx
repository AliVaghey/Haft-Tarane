import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const AdminPage = () => {
  redirect(routes.admin.dashboard);
};

export default AdminPage;
