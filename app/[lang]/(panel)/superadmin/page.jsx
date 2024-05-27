import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const SuperadminPage = () => {
  redirect(routes.superadmin.dashboard);
};

export default SuperadminPage;
