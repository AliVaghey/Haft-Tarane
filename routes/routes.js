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
    purchase: "/tours/purchase",
  },

  "nature-tours": {
    root: "/nature-tours",
    details: (id) => `/nature-tours/${id}`,
  },

  flights: {
    root: "/flights",
  },

  superadmin: {
    dashboard: "/superadmin/dashboard",
    profile: {
      "user-info": "/superadmin/profile/user-info",
      "update-password": "/superadmin/profile/update-password",
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
    "profit-rates": {
      root: "/superadmin/profit-rates",
      add: "/superadmin/profit-rates/add",
      edit: (id) => `/superadmin/profit-rates/${id}/edit`,
    },
    "transportation-api": {
      flights: {
        root: "/superadmin/transportation-api/flights",
      },
    },
    options: {
      "tour-styles": {
        root: "/superadmin/options/tour-styles",
        add: "/superadmin/options/tour-styles/add",
      },
      certificates: {
        root: "/superadmin/options/certificates",
        add: "/superadmin/options/certificates/add",
      },
      "free-services": {
        root: "/superadmin/options/free-services",
        add: "/superadmin/options/free-services/add",
      },
      "tour-descriptions": {
        root: "/superadmin/options/tour-descriptions",
        add: "/superadmin/options/tour-descriptions/add",
      },
      "room-types": {
        root: "/superadmin/options/room-types",
        add: "/superadmin/options/room-types/add",
      },
    },
    "transportation-options": {
      airplane: {
        root: "/superadmin/transportation-options/airplane",
        add: "/superadmin/transportation-options/airplane/add",
      },
      train: {
        root: "/superadmin/transportation-options/train",
        add: "/superadmin/transportation-options/train/add",
      },
      bus: {
        root: "/superadmin/transportation-options/bus",
        add: "/superadmin/transportation-options/bus/add",
      },
    },
  },

  admin: {
    dashboard: "/admin/dashboard",
    profile: {
      "user-info": "/admin/profile/user-info",
      "update-password": "/admin/profile/update-password",
    },
    users: {
      root: "/admin/users",
      edit: (id) => `/admin/users/${id}/edit`,
      details: (id) => `/admin/users/${id}`,
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
    accounting: {
      paid: {
        root: "/admin/accounting/paid",
      },
      sales: {
        root: "/admin/accounting/sales",
      },
    },
  },

  agency: {
    profile: {
      "user-info": "/agency/profile/user-info",
      "agency-info": "/agency/profile/agency-info",
      "update-password": "/agency/profile/update-password",
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
    "booked-tours": {
      root: "/agency/booked-tours",
      details: (id) => `/agency/booked-tours/${id}`,
    },
    sales: {
      all: "/agency/sales/all",
      pending: {
        root: "/agency/sales/pending",
        details: (id) => `/agency/sales/pending/${id}`,
      },
      paid: {
        root: "/agency/sales/paid",
        details: (id) => `/agency/sales/paid/${id}`,
      },
      checkout: {
        root: "/agency/sales/checkout",
        details: (id) => `/agency/sales/checkout/${id}`,
      },
      accounting: "/agency/sales/accounting",
      leads: "/agency/sales/leads",
    },
  },

  user: {
    dashboard: "/user/dashboard",
    profile: {
      "user-info": "/user/profile/user-info",
      "update-password": "/user/profile/update-password",
    },
    tours: {
      root: "/user/tours",
      details: (id) => `/user/tours/${id}`,
    },
  },
};
