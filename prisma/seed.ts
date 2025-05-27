import { PrismaClient } from "@prisma/client";
import testUserSeed from "./testUserSeed";
const prisma = new PrismaClient()

export async function main() {
  try {
    await prisma.user.deleteMany()
    console.log('Deleted records in user table')

    await prisma.category.deleteMany()
    console.log('Deleted records in category table')

    // await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
    // console.log('reset product auto increment to 1')

    // await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    // console.log('reset category auto increment to 1')
console.log('testUserSeed', testUserSeed)
    await prisma.user.createMany({
      data: testUserSeed
    })
    console.log('Added category data')

    // await prisma.product.createMany({
    //   data: products
    // })
    // console.log('Added product data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()