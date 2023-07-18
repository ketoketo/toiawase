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
      const member = await prisma.member.findUnique({
        where: {
          name: 'burg',
        },
      });
      const toiawase = await prisma.toiawase.findUnique({
        where: {
          name: 'mynapo',
        },
      });
      const newMemberToiawase = await prisma.memberToiawase.create({
        data: {
          memberId: member.id,
          toiawaseId: toiawase.id,
        },
      });
      return response.status(200).json({ message: 'ok' });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}