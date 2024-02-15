import type {NextApiRequest, NextApiResponse, NextPageContext} from 'next';
import {deleteData, getAllDataSTR} from '../route';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return new Response(getAllDataSTR());
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body.data;
  // addData(data);
  return new Response('POST || Add successfully');
}

// it can change all data.
export async function PUT(request: Request) {
  try {
    console.log('working well 1');
    // JSON.parse('{"rightQuotes": 5}');
    console.log(JSON.stringify({name: 'the new one'}));
    // const res = await request.json();
    // console.log('working well 2');
    // console.log('res ', res);
    // return Response.json({res});
  } catch (err) {
    console.log('err ', err);
  }
  return new Response(JSON.stringify({data: getAllDataSTR()}), {
    status: 201,
    headers: {'Content-type': 'application/json'},
  });
}

// only change particular data not change all data
export async function PATCH(request: Request) {
  try {
    const result = await request.json();
    console.log(result);
  } catch (err) {
    console.log('err ', err);
  }
  return new Response(JSON.stringify({data: getAllDataSTR()}), {
    status: 201,
    headers: {'Content-type': 'application/json'},
  });
}

export async function DELETE(req: NextApiRequest, context: any) {
  const slug = context.params;
  const [firstParm, secondParm, thirdParm] = slug.slug;
  deleteData(firstParm);
  console.log('others data => ', getAllDataSTR());
  return new Response(JSON.stringify({data: getAllDataSTR(), status: 200}));
}
