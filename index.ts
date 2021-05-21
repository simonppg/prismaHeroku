import { PrismaClient } from '@prisma/client'
import express, {Request, Response} from 'express'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany({})
  await prisma.user.create({
    data: {
      email: `example${new Date().toISOString()}@email.com`
    }
  })
  const allUsers = await prisma.user.findMany()
  return allUsers
}

// Constants
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST

// App
const app = express()
app.get('/', async (req: Request, res: Response) => {
  try{
    const users = await main()
    res.json({
      msg: 'Hello World!',
      data: users
    })
  }
  catch(e: any){
    console.log(e)
    res.send('error' + e?.message)
    await prisma.$disconnect()
  }
})

app.listen(PORT)
console.log(`Running on http://${HOST}:${PORT}`)