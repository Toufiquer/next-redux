import type {NextApiRequest, NextApiResponse} from 'next';

const consoleData = ({method, data = ''}: {method: string; data?: any}) => {
  console.log('');
  console.log('');
  console.log('');
  console.log('');
  console.log(' backend => : ', method, ' => : ', data);
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result = req;
  consoleData({method: 'Get', data: result});
  return new Response('GET ||  successfully hit the url');
}
export async function POST(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  const result = await req.json();
  consoleData({method: 'POST', data: result});
  return new Response('POST ||  successfully hit the url');
}

// it can change all data.
export async function PUT(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  const result = await req.json();
  consoleData({method: 'PUT', data: result});
  return new Response('PUT ||  successfully hit the url');
}

// only change particular data not change all data
export async function PATCH(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  const result = await req.json();
  consoleData({method: 'PATCH', data: result});
  return new Response('PATCH ||  successfully hit the url');
}

export async function DELETE(
  req: NextApiRequest & {json: () => void},
  res: NextApiResponse,
) {
  const result = await req.json();
  consoleData({method: 'DELETE', data: result});
  return new Response('DELETE ||  successfully hit the url');
}
