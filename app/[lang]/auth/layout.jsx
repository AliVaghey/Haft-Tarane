// import AuthProvider from "@/providers/auth-provider";

const AuthLayout = async ({ children }) => {
  // return <AuthProvider>{children}</AuthProvider>;
  return <main>{children}</main>;
};

export default AuthLayout;
