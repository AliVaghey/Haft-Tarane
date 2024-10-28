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
    "all-tours": {
      all: "/superadmin/all-tours/all",
      active: "/superadmin/all-tours/active",
      pending: "/superadmin/all-tours/pending",
      rejected: "/superadmin/all-tours/rejected",
      expired: "/superadmin/all-tours/expired",
      drafts: "/superadmin/all-tours/drafts",
      details: (id) => `/superadmin/all-tours/${id}`,
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
    currency: {
      root: "/superadmin/currency",
    },
    "transportation-api": {
      flights: {
        root: "/superadmin/transportation-api/flights",
      },
    },
    "slider-cards": {
      root: "/superadmin/slider-cards",
      add: "/superadmin/slider-cards/add",
      edit: (id) => `/superadmin/slider-cards/${id}/edit`,
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
      labels: {
        root: "/superadmin/options/labels",
        add: "/superadmin/options/labels/add",
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
      "airplane-type": {
        root: "/superadmin/transportation-options/airplane-type",
        add: "/superadmin/transportation-options/airplane-type/add",
      },
      "train-type": {
        root: "/superadmin/transportation-options/train-type",
        add: "/superadmin/transportation-options/train-type/add",
      },
      "bus-type": {
        root: "/superadmin/transportation-options/bus-type",
        add: "/superadmin/transportation-options/bus-type/add",
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
        "agency-paid": (id) => `/admin/accounting/paid/${id}/agency-paid`,
        "checkout-details": (agencyId, checkoutId) =>
          `/admin/accounting/paid/${agencyId}/agency-paid/${checkoutId}`,
      },
      sales: {
        root: "/admin/accounting/sales",
        "agency-sales": (id) => `/admin/accounting/sales/${id}/agency-sales`,
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
    },

    accounting: {
      checkout: {
        root: "/agency/accounting/checkout",
        "agency-sales": (id) =>
          `/agency/accounting/checkout/${id}/agency-sales`,
      },
      "awaiting-payment": {
        root: "/agency/accounting/awaiting-payment",
        // "agency-sales": (id) =>
        //   `/agency/accounting/checkout/${id}/agency-sales`,
      },
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
