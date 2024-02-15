import type {NextApiRequest, NextApiResponse} from 'next';

// data is likely database;
const assignmentData: {title: string; id: number}[] = [];
for (let i = 1; i <= 20; i++) {
  assignmentData.push({
    title: `Assignment ${i}`,
    id: i,
  });
}

// update database functionality
export const getAllDataSTR = () => JSON.stringify(assignmentData);
export const addData = (str: string) => {
  assignmentData.push({
    title: `${str}`,
    id: assignmentData.length,
  });
};
export const deleteData = (id: number) => {
  const others = assignmentData.filter(
    i => parseInt(i.id + '') !== parseInt(id + ''),
  );
  assignmentData.length = 0;
  assignmentData.push(...others);
};
export const updateData = (id: number, str: string) => {
  const others = assignmentData.map(i => {
    const result = {...i};
    if (id === result.id) {
      result.title = str;
    }
    return result;
  });
  assignmentData.length = 0;
  assignmentData.push(...others);
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return new Response(getAllDataSTR());
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body.data;
  addData(data);
  return new Response(
    JSON.stringify({data: 'Assignment || Add successfully', status: 200}),
  );
}

// it can change all data.
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const id = req.body.id;
  const data = req.body.data;
  updateData(id, data);
  return new Response('PUT ||  Assignment update successfully');
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
  return new Response('DELETE || Assignment deleted successfully');
}
