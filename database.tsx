export const dummyCategoryData = {
  success: true,
  data: [
    {
      id: 2,
      name: "Thanka",
      specification: ["height", "weight", "size", "materials"],
      brands: ["Sharp"],
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      createdAt: "2025-07-14T03:10:27.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 1,
      name: "FLAPPYBIRD",
      specification: ["google", "earth", "universe", "globe"],
      brands: ["Sharp", "hello"],
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      createdAt: "2025-06-30T03:40:59.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 3,
      name: "Thanka 2",
      specification: ["height", "weight", "size", "materials"],
      brands: ["Sharp"],
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      createdAt: "2025-07-14T03:10:27.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 4,
      name: "FLAPPYBIRD 2",
      specification: ["google", "earth", "universe", "globe"],
      brands: ["Sharp", "hello"],
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      createdAt: "2025-06-30T03:40:59.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
  ],
  pagenation: {
    total: 2,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummyProductData = {
  success: true,
  data: [
    {
      id: 5,
      name: "kaa Thanka",
      costPrice: "2300",
      sellingPrice: "3400",
      quantity: "12",
      tax: null,
      offer: "0",
      vendor: {
        id: 1,
        name: "Shyam Prasad",
      },
      description: "<p>this is thanka description</p>",
      category: {
        id: 2,
        name: "Thanka",
      },
      brand: "No brand",
      store: {
        id: "d738a02154a1d63ea4668ab5eb5ff7dc",
        name: "Thanka",
      },
      barCode: "34567890",
      specification: {
        size: "23",
        height: "34",
        weight: "56",
        materials: "gold",
      },
      images: [
        "https://apricusartcollection.com/cdn/shop/files/5-ZAMBALA_55b6564b-4b0d-4c9e-9ec5-23c04bedc84a.jpg?v=1730556815&width=1140",
      ],
      createdAt: "2025-07-15T13:44:26.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      updatedBy: null,
    },
    {
      id: 4,
      name: "Thanka Scanner",
      costPrice: "232",
      sellingPrice: "345",
      quantity: "23",
      tax: null,
      offer: "0",
      vendor: {
        id: 2,
        name: "Shyam ",
      },
      description: "<p>idgfndfgindfg</p>",
      category: {
        id: 1,
        name: "FLAPPYBIRD",
      },
      brand: "No brand",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      barCode: "234324234",
      specification: {
        earth: "iudfgin",
        globe: "iuhifgndifng",
        google: "usifsdifn",
        universe: "uhdfgndn",
      },
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Reflecta_DigitDia_6000_Slide_Scanner_(1).jpg",
      ],
      createdAt: "2025-07-14T05:44:43.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      updatedBy: null,
    },
    {
      id: 3,
      name: "Barcode ",
      costPrice: "212",
      sellingPrice: "234",
      quantity: "13",
      tax: null,
      offer: "0",
      vendor: {
        id: 2,
        name: "Shyam ",
      },
      description: "<p>sdfijnsdfsdif</p>",
      category: {
        id: 1,
        name: "FLAPPYBIRD",
      },
      brand: "No brand",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      barCode: "123123",
      specification: {
        earth: "ofwifn",
        globe: "oknfsdnsdfn",
        google: "kewlrm",
        universe: "onsdfnosndf",
      },
      images: [
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d74b6822-d9b3-40a2-bf34-847d1059de30.__CR0,0,1200,900_PT0_SX300_V1___.jpg",
      ],
      createdAt: "2025-07-13T11:04:13.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
      updatedBy: null,
    },
  ],
  pagenation: {
    total: 3,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummyStaffData = {
  success: true,
  data: [
    {
      id: "9873a0308c35b579a8c2de18502e278b",
      firstName: "Rohan",
      lastName: "Shrestha",
      staffId: "btrau39",
      role: "Staff",
      email: "nahorshrestha@gmail.com",
      isVerified: 1,
      phoneNumber: "2139972861",
      address: "2217 Petunia Lane, Rowlett, TX 75089",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      payPerHour: "34",
      days: [2, 3, 4, 5, 6],
      shift: [
        {
          end: "10PM",
          start: "9AM",
        },
      ],
    },
    {
      id: "00a82b7eea911c1640fb57f874920c33",
      firstName: "Niju",
      lastName: "Shrestha",
      staffId: null,
      role: "Staff",
      email: "nijushrestha@gmail.com",
      isVerified: 1,
      phoneNumber: "1139972861",
      address: "2217 Petunia Lane, Rowlett, TX 75089",
      store: {
        id: "d738a02154a1d63ea4668ab5eb5ff7dc",
        name: "Thanka",
      },
      payPerHour: "10",
      days: [2, 3, 4, 5, 6],
      shift: [
        {
          end: "10PM",
          start: "9AM",
        },
      ],
    },
  ],
  pagenation: {
    total: 2,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummyStoreData = {
  success: true,
  data: [
    {
      id: "a2ded0bbc677460a2230f079d8d303e2",
      name: "FLAPPYBIRD",
      address: "Dallas, TX 74089",
      storeNumber: 3009,
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      tax: "8",
      open: [
        {
          day: "Sun",
          time: "9:00 AM",
        },
        {
          day: "Mon",
          time: "9:00 AM",
        },
        {
          day: "Tus",
          time: "9:00 AM",
        },
        {
          day: "Wed",
          time: "9:00 AM",
        },
        {
          day: "Thr",
          time: "9:00 AM",
        },
        {
          day: "Fri",
          time: "9:00 AM",
        },
        {
          day: "Sat",
          time: "9:00 AM",
        },
      ],
      close: [
        {
          day: "Sun",
          time: "10:00 PM",
        },
        {
          day: "Mon",
          time: "10:00 PM",
        },
        {
          day: "Tus",
          time: "10:00 PM",
        },
        {
          day: "Wed",
          time: "10:00 PM",
        },
        {
          day: "Thr",
          time: "10:00 PM",
        },
        {
          day: "Fri",
          time: "10:00 PM",
        },
        {
          day: "Sat",
          time: "10:00 PM",
        },
      ],
      createdAt: "2025-07-21T04:16:11.000Z",
    },
    {
      id: "d70e996bd2940e493913b1052546971d",
      name: "Gencraft Ai",
      address: "Rowlett",
      storeNumber: 2456,
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      tax: "11",
      open: [
        {
          day: "Sun",
          time: "9:00 AM",
        },
        {
          day: "Mon",
          time: "9:00 AM",
        },
        {
          day: "Tus",
          time: "9:00 AM",
        },
        {
          day: "Wed",
          time: "9:00 AM",
        },
        {
          day: "Thr",
          time: "9:00 AM",
        },
        {
          day: "Fri",
          time: "9:00 AM",
        },
        {
          day: "Sat",
          time: "9:00 AM",
        },
      ],
      close: [
        {
          day: "Sun",
          time: "10:00 PM",
        },
        {
          day: "Mon",
          time: "10:00 PM",
        },
        {
          day: "Tus",
          time: "10:00 PM",
        },
        {
          day: "Wed",
          time: "10:00 PM",
        },
        {
          day: "Thr",
          time: "10:00 PM",
        },
        {
          day: "Fri",
          time: "10:00 PM",
        },
        {
          day: "Sat",
          time: "10:00 PM",
        },
      ],
      createdAt: "2025-07-21T04:15:45.000Z",
    },
    {
      id: "612c845b9a49dbf507d86b34016ca9c2",
      name: "Pepe",
      address: "Petunia ln, Rowlett TX",
      storeNumber: 3340,
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      tax: "12",
      open: [
        {
          day: "Sun",
          time: "9:00 AM",
        },
        {
          day: "Mon",
          time: "9:00 AM",
        },
        {
          day: "Tus",
          time: "9:00 AM",
        },
        {
          day: "Wed",
          time: "9:00 AM",
        },
        {
          day: "Thr",
          time: "9:00 AM",
        },
        {
          day: "Fri",
          time: "9:00 AM",
        },
        {
          day: "Sat",
          time: "9:00 AM",
        },
      ],
      close: [
        {
          day: "Sun",
          time: "10:00 PM",
        },
        {
          day: "Mon",
          time: "10:00 PM",
        },
        {
          day: "Tus",
          time: "10:00 PM",
        },
        {
          day: "Wed",
          time: "10:00 PM",
        },
        {
          day: "Thr",
          time: "10:00 PM",
        },
        {
          day: "Fri",
          time: "10:00 PM",
        },
        {
          day: "Sat",
          time: "10:00 PM",
        },
      ],
      createdAt: "2025-07-21T04:15:28.000Z",
    },
    {
      id: "d738a02154a1d63ea4668ab5eb5ff7dc",
      name: "Thanka",
      address: "Petunia ln, Rowlett TX",
      storeNumber: 2392,
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      tax: "23",
      open: [
        {
          day: "Sun",
          time: "9:00 AM",
        },
        {
          day: "Mon",
          time: "9:00 AM",
        },
        {
          day: "Tus",
          time: "9:00 AM",
        },
        {
          day: "Wed",
          time: "9:00 AM",
        },
        {
          day: "Thr",
          time: "9:00 AM",
        },
        {
          day: "Fri",
          time: "9:00 AM",
        },
        {
          day: "Sat",
          time: "9:00 AM",
        },
      ],
      close: [
        {
          day: "Sun",
          time: "10:00 PM",
        },
        {
          day: "Mon",
          time: "10:00 PM",
        },
        {
          day: "Tus",
          time: "10:00 PM",
        },
        {
          day: "Wed",
          time: "10:00 PM",
        },
        {
          day: "Thr",
          time: "10:00 PM",
        },
        {
          day: "Fri",
          time: "10:00 PM",
        },
        {
          day: "Sat",
          time: "10:00 PM",
        },
      ],
      createdAt: "2025-07-14T16:13:26.000Z",
    },
    {
      id: "80e56cc18fff40f0cb999d143b562187",
      name: "Scanner",
      address: "Petunia ln, Rowlett TX",
      storeNumber: 2391,
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
      tax: "10",
      open: [
        {
          day: "Sun",
          time: "9:00 AM",
        },
        {
          day: "Mon",
          time: "9:00 AM",
        },
        {
          day: "Tus",
          time: "9:00 AM",
        },
        {
          day: "Wed",
          time: "9:00 AM",
        },
        {
          day: "Thr",
          time: "9:00 AM",
        },
        {
          day: "Fri",
          time: "9:00 AM",
        },
        {
          day: "Sat",
          time: "9:00 AM",
        },
      ],
      close: [
        {
          day: "Sun",
          time: "10:00 PM",
        },
        {
          day: "Mon",
          time: "10:00 PM",
        },
        {
          day: "Tus",
          time: "10:00 PM",
        },
        {
          day: "Wed",
          time: "10:00 PM",
        },
        {
          day: "Thr",
          time: "10:00 PM",
        },
        {
          day: "Fri",
          time: "10:00 PM",
        },
        {
          day: "Sat",
          time: "10:00 PM",
        },
      ],
      createdAt: "2025-07-13T10:47:09.000Z",
    },
  ],
  pagination: {
    total: 5,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummyVendorData = {
  success: true,
  data: [
    {
      id: 5,
      name: "Radhya Shyam",
      address: "Arlinton, TX ",
      storeName: "Smoke Shop",
      products: ["smoke", "cigrate", "vape", "sative", "role"],
      createdAt: "2025-07-21T04:19:58.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 4,
      name: "Vape kanxa",
      address: "Petunia ln, Rowlett TX",
      storeName: "The Vape kanxa",
      products: ["smoke", "cigrate", "vape", "sative", "role"],
      createdAt: "2025-07-21T04:19:25.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 3,
      name: "Rohan Shrestha",
      address: "Petunia ln, Rowlett TX",
      storeName: "The vape store",
      products: ["smoke", "cigrate", "vape", "sative", "role"],
      createdAt: "2025-07-21T04:18:14.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 2,
      name: "Shyam ",
      address: "2217 Petunia Lane, Rowlett, TX 75089",
      storeName: "3423 Rowlettt",
      products: ["vape"],
      createdAt: "2025-06-30T06:05:12.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: 1,
      name: "Shyam Prasad",
      address: "2217 Petunia Lane, Rowlett, TX 75089",
      storeName: "3423 Rowlett ",
      products: ["vape"],
      createdAt: "2025-06-30T06:04:32.000Z",
      createdBy: "e2a3daba1e99d4668f9776b21cbea645",
    },
  ],
  pagination: {
    total: 5,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummySalesData = {
  success: true,
  data: [
    {
      id: "58b5d4829e0163feeb83dbed4f08ee70",
      store: {
        id: "d738a02154a1d63ea4668ab5eb5ff7dc",
        name: "Thanka",
      },
      subTotal: "6800",
      discount: "154.79000000000002",
      salesTax: "23",
      total: "8173.6083",
      quantity: "2",
      createdAt: "2025-07-17T13:39:04.000Z",
      createdBy: "Rohan",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: "de4715bb0945a74e0cee6224f54fb5b3",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      subTotal: "813",
      discount: "113",
      salesTax: "10",
      total: "770",
      quantity: "3",
      createdAt: "2025-07-15T16:53:26.000Z",
      createdBy: "Super Admin",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: "0c8bf72b49d4cf7784016b4b7ffaccfb",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      subTotal: "579",
      discount: "11.22",
      salesTax: "8",
      total: "613.2024",
      quantity: "2",
      createdAt: "2025-07-15T16:45:18.000Z",
      createdBy: "Super Admin",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: "d221dcd2d3c6cb14f1285fc51a26e081",
      store: {
        id: "d738a02154a1d63ea4668ab5eb5ff7dc",
        name: "Thanka",
      },
      subTotal: "3400",
      discount: "200",
      salesTax: "23",
      total: "3936",
      quantity: "1",
      createdAt: "2025-07-15T14:13:24.000Z",
      createdBy: "Niju",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: "63ca130972a2c73916059a05717b3c49",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      subTotal: "1158",
      discount: "79",
      salesTax: "8",
      total: "1165.32",
      quantity: "4",
      createdAt: "2025-07-15T14:12:05.000Z",
      createdBy: "Super Admin",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
    },
    {
      id: "40b42fbf71100be057df639f3f239708",
      store: {
        id: "d738a02154a1d63ea4668ab5eb5ff7dc",
        name: "Thanka",
      },
      subTotal: "6800",
      discount: "600",
      salesTax: "23",
      total: "7626",
      quantity: "2",
      createdAt: "2025-07-15T14:11:29.000Z",
      createdBy: "Super Admin",
      createdUnder: "e2a3daba1e99d4668f9776b21cbea645",
    },
  ],
  pagenation: {
    total: 6,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummySalesHistoryData = {
  success: true,
  data: [
    {
      id: 2,
      name: "Barcode ",
      barCode: "123123",
      salesId: "63ca130972a2c73916059a05717b3c49",
      discount: "34",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      vendor: {
        id: 2,
        name: "Shyam ",
      },
      category: {
        id: 1,
        name: "FLAPPYBIRD",
      },
      images: [
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d74b6822-d9b3-40a2-bf34-847d1059de30.__CR0,0,1200,900_PT0_SX300_V1___.jpg",
      ],
      subTotal: "468",
      salesTax: "8",
      total: "471.44",
      quantity: "2",
      createdAt: "2025-07-15T14:12:05.000Z",
      createdBy: "Super Admin",
    },
    {
      id: 3,
      name: "Thanka Scanner",
      barCode: "234324234",
      salesId: "63ca130972a2c73916059a05717b3c49",
      discount: "45",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      vendor: {
        id: 2,
        name: "Shyam ",
      },
      category: {
        id: 1,
        name: "FLAPPYBIRD",
      },
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Reflecta_DigitDia_6000_Slide_Scanner_(1).jpg",
      ],
      subTotal: "690",
      salesTax: "8",
      total: "700.2",
      quantity: "2",
      createdAt: "2025-07-15T14:12:05.000Z",
      createdBy: "Super Admin",
    },
    {
      id: 2,
      name: "Thanka ",
      barCode: "123123",
      salesId: "63ca130972a2c73916059a05717b3c49",
      discount: "34",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      vendor: {
        id: 2,
        name: "Shyam ",
      },
      category: {
        id: 1,
        name: "FLAPPYBIRD",
      },
      images: [
        "https://i.etsystatic.com/18537647/c/2250/2250/0/220/il/3f296d/2771424106/il_600x600.2771424106_nalw.jpg",
      ],
      subTotal: "468",
      salesTax: "8",
      total: "471.44",
      quantity: "2",
      createdAt: "2025-07-15T14:12:05.000Z",
      createdBy: "Super Admin",
    },
  ],
  pagenation: {
    total: 2,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export const dummyUserDetails = {
  success: true,
  data: [
    {
      id: "9873a0308c35b579a8c2de18502e278b",
      firstName: "Rohan",
      lastName: "Shrestha",
      staffId: "btrau39",
      role: "Staff",
      email: "nahorshrestha@gmail.com",
      isVerified: 1,
      phoneNumber: "2139972861",
      address: "2217 Petunia Lane, Rowlett, TX 75089",
      store: {
        id: "80e56cc18fff40f0cb999d143b562187",
        name: "Scanner",
      },
      payPerHour: "34",
      days: [2, 3, 4, 5, 6],
      shift: [
        {
          end: "10PM",
          start: "9AM",
        },
      ],
    },
  ],
};
