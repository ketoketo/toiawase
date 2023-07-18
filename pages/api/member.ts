import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === 'POST') {
      const member = await prisma.member.create({
        data: {
          name: request.body
        },
      })
      return response.status(200).json(member);
    } else {
      const member = await prisma.member.create({
        data: {
          name: 'gerard'
        },
      })
      return response.status(200).json(member);
      // return response.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}