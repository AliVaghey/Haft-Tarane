import { CookiesProvider } from "next-client-cookies/server";

const AuthLayout = async ({ children }) => {
  return (
    <main>
      <CookiesProvider>{children}</CookiesProvider>
    </main>
  );
};

export default AuthLayout;
