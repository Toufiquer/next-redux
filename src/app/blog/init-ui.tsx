/*
|-----------------------------------------
| setting up Page for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/


/**
 * $ This file is part redux store. Not rtk-query. Also it is not using api
 * */

import {z} from 'zod';
import {Dispatch, SetStateAction} from 'react';
import {LuTrash} from 'react-icons/lu';
import {FaRegEdit} from 'react-icons/fa';
import {useAppSelector} from '@/redux/app/store';
import {initSingleBlogDataType} from './page';



export default function InitRender({
  data,
}: {
  data: {
    handleCancel: () => void;
    setCurrentRender: Dispatch<SetStateAction<string>>;
    setBlogsData: Dispatch<SetStateAction<initSingleBlogDataType>>;
  };
}) {
  const {setCurrentRender, setBlogsData} = data || {};
  const {data: globalStoreBlog} = useAppSelector(state => state.blogs);

  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-4">
      <div className="flex items-center justify-between min-w-[500px]">
        <h2 className="text-4xl uppercase text-center">Blogs</h2>
        <button
          className="border px-4 py-2 cursor-pointer rounded-lg bg-green-500"
          onClick={() => setCurrentRender('add')}>
          Add new Blog
        </button>
      </div>
      {globalStoreBlog.map(curr => (
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
}
