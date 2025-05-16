const testUserSeed = [
  {
    name: "Test User",
    email: "test@prisma.io",
    role: 'applicator',
    license: '123456',
    // categories: {
    //   create: [
    //     {
    //       category: "6B"
    //     },
    //     {
    //       category: "8B"
    //     },
    //     {
    //       category: "7A"
    //     },
        
    //   ],
    // },
  },
  {
    name: "Test Business",
    role: 'business',
    license: '987654',
    // employees: {
    //   connect: {
    //     license: '123456'
    //   }
    // }
  },
  {
    name: "Michelle Stuart",
    email: 'michelle.stuart@rutgers.edu',
    role: 'admin',

  },
];

export default testUserSeed;