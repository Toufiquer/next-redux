import type {NextApiRequest, NextApiResponse} from 'next';

// data is likely database;
const postData: {title: string; id: number}[] = [];
for (let i = 1; i <= 20; i++) {
  postData.push({
    title: `Post ${i}`,
    id: i,
  });
}

// update database functionality
export const getAllDataSTR = () => JSON.stringify(postData);
export const addData = (str: string) => {
  postData.push({
    title: `${str}`,
    id: postData.length,
  });
};
export const deleteData = (id: number) => {
  const others = postData.filter(
    i => parseInt(i.id + '') !== parseInt(id + ''),
  );
  postData.length = 0;
  postData.push(...others);
};
export const updateData = (id: number, str: string) => {
  const others = postData.map(i => {
    const result = {...i};
    if (id === result.id) {
      result.title = str;
    }
    return result;
  });
  postData.length = 0;
  postData.push(...others);
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return new Response(getAllDataSTR());
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body.data;
  console.log(data);
  addData(data);
  return new Response(
    JSON.stringify({data: 'POST || Add successfully', status: 200}),
  );
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

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  console.log(id);
  deleteData(id);
  return new Response('DELETE || post deleted successfully');
}
