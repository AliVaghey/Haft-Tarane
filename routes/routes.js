import { root } from "postcss";

export const routes = {
  landing: {
    root: "/",
  },

  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },

  tours: {
    root: "/tours",
    details: (id) => `/tours/${id}`,
  },

  superadmin: {
    dashboard: "/superadmin/dashboard",
    profile: {
      "user-info": "/superadmin/profile/user-info",
    },
    cities: {
      root: "/superadmin/cities",
      add: "/superadmin/cities/add",
      edit: (id) => `/superadmin/cities/${id}/edit`,
    },
    users: {
      root: "/superadmin/users",
      edit: (id) => `/superadmin/users/${id}/edit`,
      details: (id) => `/superadmin/users/${id}`,
    },
    admins: {
      root: "/superadmin/admins",
      edit: (id) => `/superadmin/admins/${id}/edit`,
      details: (id) => `/superadmin/admins/${id}`,
    },
    agencies: {
      root: "/superadmin/agencies",
      details: (id) => `/superadmin/agencies/${id}`,
    },
    "your-agencies": {
      root: "/superadmin/your-agencies",
      details: (id) => `/superadmin/your-agencies/${id}`,
    },
    hotels: {
      root: "/superadmin/hotels",
      add: "/superadmin/hotels/add",
      edit: (id) => `/superadmin/hotels/${id}/edit`,
      details: (id) => `/superadmin/hotels/${id}`,
    },
    "your-hotels": {
      root: "/superadmin/your-hotels",
      add: "/superadmin/your-hotels/add",
      edit: (id) => `/superadmin/your-hotels/${id}/edit`,
      details: (id) => `/superadmin/your-hotels/${id}`,
    },
    tours: {
      all: "/superadmin/tours/all",
      pending: "/superadmin/tours/pending",
      active: "/superadmin/tours/active",
      details: (id) => `/superadmin/tours/${id}`,
    },
    "special-tours": {
      root: "/superadmin/special-tours",
      add: "/superadmin/special-tours/add",
      edit: (id) => `/superadmin/special-tours/${id}/edit`,
    },
    banners: {
      root: "/superadmin/banners",
      add: "/superadmin/banners/add",
      edit: (id) => `/superadmin/banners/${id}/edit`,
    },
  },

  admin: {
    dashboard: "/admin/dashboard",
    profile: {
      "user-info": "/admin/profile/user-info",
    },
    // cities: {
    //   root: "/admin/cities",
    //   add: "/admin/cities/add",
    //   edit: (id) => `/admin/cities/${id}/edit`,
    // },
    users: {
      root: "/admin/users",
      edit: (id) => `/admin/users/${id}/edit`,
      details: (id) => `/admin/users/${id}`,
    },
    // admins: {
    //   root: "/admin/admins",
    //   edit: (id) => `/admin/admins/${id}/edit`,
    //   details: (id) => `/admin/admins/${id}`,
    // },
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
    "your-hotels": {
      root: "/admin/your-hotels",
      add: "/admin/your-hotels/add",
      edit: (id) => `/admin/your-hotels/${id}/edit`,
      details: (id) => `/admin/your-hotels/${id}`,
    },
    tours: {
      all: "/admin/tours/all",
      pending: "/admin/tours/pending",
      active: "/admin/tours/active",
      details: (id) => `/admin/tours/${id}`,
    },
  },

  user: {
    dashboard: "/user/dashboard",
  },

  agency: {
    profile: {
      "user-info": "/agency/profile/user-info",
      "agency-info": "/agency/profile/agency-info",
    },
    dashboard: "/agency/dashboard",
    "support-team": {
      root: "/agency/support-team",
      add: "/agency/support-team/add",
      edit: (id) => `/agency/support-team/${id}/edit`,
    },
    tours: {
      all: "/agency/tours/all",
      draft: "/agency/tours/draft",
      pending: "/agency/tours/pending",
      rejected: "/agency/tours/rejected",
      create: "/agency/tours/create",
      details: (id) => `/agency/tours/${id}`,
      edit: {
        "basic-information": (id) =>
          `/agency/tours/${id}/edit/basic-information`,
        "travel-plans": (id) => `/agency/tours/${id}/edit/travel-plans`,
        documents: (id) => `/agency/tours/${id}/edit/documents`,
        hotels: (id) => `/agency/tours/${id}/edit/hotels`,
        dates: (id) => `/agency/tours/${id}/edit/dates`,
      },
    },
    sales: {
      all: "/agency/sales/all",
      "pending-pay": "/agency/sales/pending-pay",
      accounting: "/agency/sales/accounting",
      leads: "/agency/sales/leads",
    },
  },
};
