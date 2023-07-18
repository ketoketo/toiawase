import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === 'POST') {
      const data = await prisma.toiawase.create({
        data: {
          name: request.body
        },
      })
      return response.status(200).json(data);
    } else {
      // return response.status(404).json({ message: 'not found' });
      const data = await prisma.toiawase.create({
        data: {
          name: 'mynapo'
        },
      })
      return response.status(200).json(data);
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}