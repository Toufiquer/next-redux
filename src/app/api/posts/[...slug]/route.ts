import type {NextApiRequest, NextApiResponse, NextPageContext} from 'next';
import {deleteData, getAllDataSTR} from '../route';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return new Response(getAllDataSTR());
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body.data;
  addData(data);
  return new Response('POST || Add successfully');
}

// it can change all data.
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  const data = req.body.data;
  updateData(id, data);
  return new Response('PUT ||  post update successfully');
}

// only change particular data not change all data
export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  const data = req.body.data;
  updateData(id, data);
  return new Response('PATCH ||  Hello from Next.js!');
}

export async function DELETE(req: NextApiRequest, context: any) {
  const slug = context.params;
  const [firstParm, secondParm, thirdParm] = slug.slug;
  deleteData(firstParm);
  console.log('others data => ', getAllDataSTR());
  return new Response(JSON.stringify({data: getAllDataSTR(), status: 200}));
}
