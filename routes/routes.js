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
      details: (id) => `/admin/agencies/${id}`,
    },
    "your-agencies": {
      root: "/admin/your-agencies",
      details: (id) => `/admin/your-agencies/${id}`,
    },
    hotels: {
      root: "/admin/hotels",
      add: "/admin/hotels/add",
      edit: (id) => `/admin/hotels/${id}/edit`,
      details: (id) => `/admin/hotels/${id}`,
    },
  },

  user: {
    dashboard: "/user/dashboard",
  },

  agency: {
    dashboard: "/user/dashboard",
  },
};
