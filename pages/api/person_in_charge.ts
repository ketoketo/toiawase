import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    if (request.method === 'GET') {
      const minToiawases = await prisma.memberToiawase.groupBy({
        by: ['toiawaseId'],
        _min: {
          junban: true
        }
      });
      const minRecords = await prisma.memberToiawase.findMany({
        where: {
          junban: {
            in: minToiawases.map((e) => e._min.junban)
          }
        },
        include: {
          member: true,
          toiawase: true,
        }
      });

      return response.status(200).json(minRecords.map((e) => { 
        return {
          member: e.member,
          toiawase: e.toiawase,
        }
       }));
    } else {
      return response.status(404).json({ message: 'not found' });
    }
  } catch (error) {
    return response.status(500).json({ error });
  }
}
