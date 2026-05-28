import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

  const { email, password } = req.body

  const user = await prisma.user.create({
    data: {
      email,
      password
    }
  })

  return res.status(200).json(user)
}
