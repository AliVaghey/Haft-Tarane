import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const AgencyPage = () => {
  redirect(routes.agency.dashboard);
};

export default AgencyPage;
