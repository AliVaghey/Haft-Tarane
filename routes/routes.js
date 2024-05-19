export const routes = {
  landing: {
    root: "/",
  },

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  admin: {
    dashboard: "/admin/dashboard",
    cities: {
      root: "/admin/cities",
      add: "/admin/cities/add",
      edit: (id) => `/admin/cities/${id}/edit`,
    },
    users: {
      root: "/admin/users",
      edit: (id) => `/admin/users/${id}/edit`,
      details: (id) => `/admin/users/${id}`,
    },
    admins: {
      root: "/admin/admins",
      edit: (id) => `/admin/admins/${id}/edit`,
      details: (id) => `/admin/admins/${id}`,
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
