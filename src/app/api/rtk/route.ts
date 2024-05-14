import dbConnect from '@/lib/dbConnect';
import Rtk, {IRtk} from '@/models/Rtk';
import type {NextApiRequest, NextApiResponse} from 'next';

const consoleData = ({
  method,
  data = '',
  result = '',
}: {
  method: string;
  data?: any;
  result?: any;
}) => {
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log(' backend => : ', method, ' => : ', data);
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const data: IRtk[] = await Rtk.find({});
  const result = {data, message: 'get request invoked successfully'};
  consoleData({method: 'Get', data: 'rtk', result});
  return new Response(JSON.stringify(result));
}
export async function POST(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  await dbConnect();

  const result = await req.json();

  const rtk: IRtk = await Rtk.create(result);
  consoleData({method: 'POST', data: result, result: rtk});
  return new Response(
    JSON.stringify({
      data: result,
      result: rtk,
      message: 'Post request successful invoke',
    }),
  );
}

// it can change all data.
export async function PUT(
  req: NextApiRequest & {json: () => {id: string; data: any}},
  res: NextApiResponse,
) {
  await dbConnect();

  const result = await req.json();

  const rtk: IRtk = await Rtk.updateOne({_id: result.id}, {name: result.title});
  consoleData({method: 'PUT', data: result, result: rtk});
  return new Response(
    JSON.stringify({
      data: result,
      result: rtk,
      message: 'Put request successful invoke',
    }),
  );
}

// only change particular data not change all data
export async function PATCH(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  await dbConnect();

  const result = await req.json();

  const rtk: IRtk = await Rtk.updateOne({_id: result.id}, {name: result.title});
  consoleData({method: 'Patch', data: result, result: rtk});
  return new Response(
    JSON.stringify({
      data: result,
      result: rtk,
      message: 'Patch request successful invoke',
    }),
  );
}

export async function DELETE(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  await dbConnect();

  const result = await req.json();

  const rtk: IRtk = await Rtk.deleteOne({_id: result.id});
  consoleData({method: 'Patch', data: result, result: rtk});
  return new Response(
    JSON.stringify({
      data: result,
      result: rtk,
      message: 'Patch request successful invoke',
    }),
  );
}
