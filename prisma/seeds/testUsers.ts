
const testSeed = async (prisma:any) => {
    await prisma.user.createMany({
        data: [
          {
            name: "Test User",
            email: "test@test.io",
            license: '123456',
            role: 'applicator'},
          {
            name: "Michelle Stuart",
            email: "michelle.stuart@rutgers.edu",
            role: "admin"
          },
          {
            name: 'Test Business',
            email: "test.business@business.com",
            license: '987654',
            role: "business"
          }] });
}

export default testSeed