/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

/**
 * $ This file is part of rtk-query. It manages cache
 * */

'use client';

import {z} from 'zod';
import {useState} from 'react';
import {LuTrash} from 'react-icons/lu';
import {RxCross2} from 'react-icons/rx';
import {useForm} from 'react-hook-form';
import {FaRegEdit} from 'react-icons/fa';

import {zodResolver} from '@hookform/resolvers/zod';

const storeBlogsData: {title: string; id: number}[] = [];
for (let i = 1; i <= 10; i++) {
  storeBlogsData.push({
    title: `Name ${i}`,
    id: i,
  });
}

// Zod schema
const blogsDataSchema = z.object({
  name: z.string().min(1, {message: 'Required'}),
});

type initSingleBlogDataType = {title: string; id: number};
const initSingleBlogData: initSingleBlogDataType = {title: 'Blog title', id: 0};

export default function Home() {
  const [blogsData, setBlogsData] =
    useState<initSingleBlogDataType>(initSingleBlogData);
  const [currentRender, setCurrentRender] = useState<string>('');

  const handleCancel = () => {
    setBlogsData(initSingleBlogData);
    setCurrentRender('');
  };

  // create form by using zod and react-hook-form
  type blogsDataSubmitType = z.infer<typeof blogsDataSchema>;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<blogsDataSubmitType>({
    resolver: zodResolver(blogsDataSchema),
  });

  // when add or update(edit)
  const onSubmit = (data: blogsDataSubmitType) => {
    console.log(data);
    setCurrentRender('');
  };

  const onDelete = () => {
    console.log('data will delete', blogsData.title);
    setCurrentRender('');
  };

  // Init Render || All Blogs
  let renderUI = (
    <main className="min-h-screen flex items-center justify-center flex-col gap-4">
      <div className="flex items-center justify-between min-w-[500px]">
        <h2 className="text-4xl uppercase text-center">Blogs</h2>
        <button
          className="border px-4 py-2 cursor-pointer rounded-lg bg-green-500"
          onClick={() => setCurrentRender('add')}>
          Add new Blog
        </button>
      </div>
      {storeBlogsData.map(curr => (
        <div key={curr.id} className="border p-2 rounded-lg px-4 min-w-[320px]">
          <div className="flex gap-4 items-center justify-between">
            <h2 className="text-2xl">
              <span className="font-extrabold">Name:</span> {curr.title}
            </h2>
            <div className="flex gap-4 items-center">
              <FaRegEdit
                className="w-[25px] h-[25px] text-green-500 cursor-pointer"
                onClick={() => {
                  setCurrentRender('edit');
                  setBlogsData({id: curr.id, title: curr.title});
                }}
              />
              <LuTrash
                className="w-[25px] h-[25px] text-rose-500 cursor-pointer"
                onClick={() => {
                  setCurrentRender('delete');
                  setBlogsData({id: curr.id, title: curr.title});
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </main>
  );

  // Delete UI
  if (currentRender === 'delete') {
    renderUI = (
      <main className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="border min-w-[400px] min-h-[400px] rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-center">Delete the Blog.</h2>
            <div className="cursor-pointer" onClick={handleCancel}>
              <RxCross2 />
            </div>
          </div>
          <h2 className="text-2xl font-light">{blogsData.title}</h2>
          <button
            onClick={onDelete}
            type="button"
            className="bg-rose-400 px-4 py-2 rounded-lg uppercase absolute bottom-4 right-4">
            Delete
          </button>
        </div>
      </main>
    );
  }

  // Update UI
  if (currentRender === 'edit') {
    setValue('name', blogsData.title);
    renderUI = (
      <main className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="border min-w-[400px] min-h-[400px] rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-center uppercase">Update Blog</h2>
            <div className="cursor-pointer" onClick={handleCancel}>
              <RxCross2 />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-sm  mt-8">Blog Name:</h3>
            <input
              {...register('name')}
              className="bg-transparent border rounded-lg px-4 py-2 w-full"
            />
            <input
              type="submit"
              className="bg-green-400 px-4 py-2 rounded-lg uppercase absolute bottom-4 right-4"
            />
          </form>
        </div>
      </main>
    );
  }

  // Add UI
  if (currentRender === 'add') {
    renderUI = (
      <main className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="border min-w-[400px] min-h-[400px] rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-center uppercase">Add Blog</h2>
            <div className="cursor-pointer" onClick={handleCancel}>
              <RxCross2 />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-sm  mt-8">Blog Name:</h3>
            <input
              {...register('name')}
              className="bg-transparent border rounded-lg px-4 py-2 w-full"
            />
            {errors.name?.message && (
              <p className="text-rose-400">{errors.name?.message}</p>
            )}
            <input
              type="submit"
              value="Add Blog"
              className="bg-green-400 px-4 py-2 rounded-lg uppercase absolute bottom-4 right-4"
            />
          </form>
        </div>
      </main>
    );
  }
  return renderUI;
}
