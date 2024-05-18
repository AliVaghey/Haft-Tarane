export const routes = {
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  admin: {
    dashboard: "/admin/dashboard",
    cities: {
      root: "/admin/cities",
      add: "/admin/cities/add",
    },
    users: {
      root: "/admin/users",
    },
    agencies: {
      root: "/admin/agencies",
    },
    hotels: {
      root: "/admin/hotels",
    },
  },

  user: {
    dashboard: "/user/dashboard",
  },

  agency: {
    dashboard: "/user/dashboard",
  },
};
