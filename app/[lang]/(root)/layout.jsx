import Footer from "@/components/landingPage/footer/Footer";
import Nav from "@/components/landingPage/nav/Nav";
import { Toaster } from "sonner";

const RootLayout = ({ children }) => {
  return (
    <main>
      <Nav />
      {children}
      <Footer />
      <Toaster position="bottom-right" />
    </main>
  );
};

export default RootLayout;
