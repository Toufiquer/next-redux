import type {NextApiRequest, NextApiResponse} from 'next';

// data is likely database;
const userData: {title: string; id: number}[] = [];
for (let i = 1; i <= 10; i++) {
  userData.push({
    title: `Name ${i}`,
    id: i,
  });
}

// update database functionality
const getAllDataSTR = () => JSON.stringify(userData);
const addData = (str: string) => {
  userData.push({
    title: `${str}`,
    id: userData.length,
  });
};
const deleteData = (id: number) => {
  const others = userData.filter(i => i.id !== id);
  userData.length = 0;
  userData.push(...others);
};
const updateData = (id: number, str: string) => {
  const others = userData.map(i => {
    const result = {...i};
    if (id === result.id) {
      result.title = str;
    }
    return result;
  });
  userData.length = 0;
  userData.push(...others);
};

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
  return new Response('PUT ||  user update successfully');
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
  deleteData(id);
  return new Response('DELETE || user deleted successfully');
}
