/*
|-----------------------------------------
| setting up Delete UI  for the Blog
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

/**
 * $ This file is part redux store. Not rtk-query. Also it is not using api
 * */

'use client';

import {toast} from 'react-toastify';
import {RxCross2} from 'react-icons/rx';
import {useDispatch} from 'react-redux';
import {Dispatch, SetStateAction} from 'react';

import {appDispatch} from '@/redux/app/store';
import {removeBlog} from '@/redux/features/blog/blogSlice';

import {initSingleBlogDataType} from './page';

export default function DeleteUI({
  data,
}: {
  data: {
    blogsData: initSingleBlogDataType;
    handleCancel: () => void;
    setCurrentRender: Dispatch<SetStateAction<string>>;
  };
}) {
  const {setCurrentRender, blogsData, handleCancel} = data || {};
  // create dispatch for dispatch function
  const dispatch = useDispatch<appDispatch>();
  const onDelete = () => {
    dispatch(
      removeBlog({
        id: blogsData.id,
        title: blogsData.title,
      }),
    );
    toast.success('Blog Delete Success');
    setCurrentRender('');
  };
  return (
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
          className="bg-rose-400 px-4 py-2 cursor-pointer rounded-lg uppercase absolute bottom-4 right-4">
          Delete
        </button>
      </div>
    </main>
  );
}
