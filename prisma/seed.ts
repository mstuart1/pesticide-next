import { PrismaClient } from "@prisma/client";
// import testUserSeed from "./testUserSeed";
import testSeed from "./seeds/testUsers";
import businessSeed from "./seeds/businesses";
import golfSeed from "./seeds/golfCourses";
import pesticideSeed from "./seeds/pesticides";
import applicatorSeed from "./seeds/applicators";
import categorySeed from "./seeds/categories";
const prisma = new PrismaClient()

export async function main() {
  try {

    await prisma.category.deleteMany()
    console.log('Deleted records in category table')

  

  await prisma.response.deleteMany();
  
  await prisma.pesticides.deleteMany({})
      await prisma.user.deleteMany()
    console.log('Deleted records in user table')


    // await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
    // console.log('reset product auto increment to 1')

    // await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    // console.log('reset category auto increment to 1')
// console.log('testUserSeed', testUserSeed)
//     await prisma.user.createMany({
//       data: testUserSeed
//     })
//     console.log('Added category data')

console.log('Seeding database...')
  await testSeed(prisma)
console.log('Added test user data')
 

  // businesses
  await businessSeed(prisma)
  console.log('Added business data')
  // golfCourses
  await golfSeed(prisma)
  console.log('Added golf course data')

  // pesticides
  await pesticideSeed(prisma)
  console.log('Added pesticide data')

  // applicators
  await applicatorSeed(prisma)
  console.log('Added applicator data')

  await categorySeed(prisma)
  console.log('Added category data')
  
    console.log('Database seeding completed successfully!')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()