import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === 'POST') {
      const toiawase = await prisma.toiawase.findUnique({
        where: {
          name: request.body.toiawaseName,
        },
      });

      const prevMemberToiawase = await prisma.memberToiawase.findFirst({
        where: {
          toiawaseId: toiawase.id
        },
        orderBy: {
          junban: 'asc'
        }
      });

      const prevMemberToiawases = await prisma.memberToiawase.findMany({
        where: {
          memberId: prevMemberToiawase?.memberId
        },
      });
      

      await prisma.memberToiawase.deleteMany({
        where: {
          memberId: prevMemberToiawase?.memberId
        }
      });

      await prisma.memberToiawase.createMany({data: prevMemberToiawases.map((e => {
        return {
          memberId: e.memberId,
          toiawaseId: e.toiawaseId,
        }
      }))});

      return response.status(200).json({ message: 'success' });
    } else {
      return response.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}
