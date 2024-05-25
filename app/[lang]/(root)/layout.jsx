import Footer from "@/components/landingPage/footer/Footer";
import Nav from "@/components/landingPage/nav/Nav";

const RootLayout = ({ children }) => {
  return (
    <main>
      <Nav />
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
