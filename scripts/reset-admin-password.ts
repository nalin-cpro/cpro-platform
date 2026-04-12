import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const PASSWORD = process.argv[2] || 'cpro_admin_2024'

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 10)
  const user = await prisma.adminUser.update({
    where: { email: 'admin@conversionprollp.com' },
    data: { password: hash },
  })
  console.log(`Password reset for ${user.email}`)

  // Verify round-trip
  const valid = await bcrypt.compare(PASSWORD, hash)
  console.log(`bcrypt.compare verify: ${valid}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
