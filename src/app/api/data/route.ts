import type { NextApiRequest, NextApiResponse } from 'next'


// data is likely database;
const data:{title:string,id:number}[] = []
for(let i =0; i<10;i++){
    data.push({
        title: `Name ${i}`,
        id: i,
    })
}


// update database functionality
const getAllDataSTR = () => JSON.stringify(data) 
const addData=(str:string)=>{
   data.push({
        title: `${str}`,
        id: data.length,
    })
}
const deleteData=(id:number)=>{
  const others = data.filter(i=> i.id !== id);
  data.length =0;
  data.push(...others);
}
const updateData=(id:number,str:string)=>{
  const others = data.map(i=> {
  const result = {...i}
  if(id === result.id){
    result.title = str;
  }
  return result

  });
  data.length =0;
  data.push(...others);
}



export async function GET(req: NextApiRequest, res: NextApiResponse){
  return new Response( getAllDataSTR())
}
export async function POST(req: NextApiRequest, res: NextApiResponse){
  const data = req.body.data;
   addData(data);
  return new Response( 'POST || Add successfully')
}

// it can change all data.
export async function PUT(req: NextApiRequest, res: NextApiResponse){
  const id =  req.body.id;
    const data = req.body.data;
  updateData(id,data)
  return new Response( 'PUT ||  user update successfully')
}

// only change particular data not change all data
export async function PATCH(req: NextApiRequest, res: NextApiResponse){
    const id =  req.body.id;
    const data = req.body.data;
  updateData(id,data)
  return new Response( 'PATCH ||  Hello from Next.js!')
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse){
    const id =  req.body.id;
  deleteData(id)
  return new Response( 'DELETE || user deleted successfully')
}