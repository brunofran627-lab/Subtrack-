import { prisma } from '../../lib/prisma'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json(userWithoutPassword)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
