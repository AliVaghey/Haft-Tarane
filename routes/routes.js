import { root } from "postcss";

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
      add: "/agency/tours/add",
      details: (id) => `/agency/tours/${id}`,
    },
    sales: {
      all: "/agency/sales/all",
      "pending-pay": "/agency/sales/pending-pay",
      accounting: "/agency/sales/accounting",
      leads: "/agency/sales/leads",
    },
  },
};
