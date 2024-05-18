import AuthProvider from "@/providers/auth-provider";

const AuthLayout = async ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthLayout;
