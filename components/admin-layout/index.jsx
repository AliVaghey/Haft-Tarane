import Header from "./header/header";
import SideBar from "./sidebar/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-3">
          <div className="min-h-full rounded-lg p-3 shadow-lg">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
