import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    return response.status(200).json({ aaaa: 'data' });
  } catch (error) {
    return response.status(500).json({ error });
  }
}