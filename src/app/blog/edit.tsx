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

import {Dispatch, SetStateAction} from 'react';
import {RxCross2} from 'react-icons/rx';
import {useDispatch} from 'react-redux';

import {updateBlog} from '@/redux/features/blog/blogSlice';
import {appDispatch} from '@/redux/app/store';
import {toast} from 'react-toastify';
import {blogsDataSubmitType, initSingleBlogDataType} from './page';

export default function EditUI({
  data,
}: {
  data: {
    register: any;
    handleSubmit: any;
    formState: any;
    blogsData: initSingleBlogDataType;
    handleCancel: () => void;
    setCurrentRender: Dispatch<SetStateAction<string>>;
  };
}) {
  const {
    setCurrentRender,
    handleCancel,
    blogsData,
    formState,
    handleSubmit,
    register,
  } = data || {};
  const {errors} = formState || {};
  // create dispatch for dispatch function
  const dispatch = useDispatch<appDispatch>();

  // Update or edit
  const onSubmit = (data: blogsDataSubmitType) => {
    // do your code
    dispatch(
      updateBlog({
        id: blogsData.id,
        title: data.name,
      }),
    );
    setCurrentRender('');
    toast.success('Blog Update Success');
  };

  return (
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
          {errors.name && (
            <p className="text-rose-400">{errors.name.message}</p>
          )}
          <input
            type="submit"
            className="bg-green-400 px-4 py-2 cursor-pointer rounded-lg uppercase absolute bottom-4 right-4"
          />
        </form>
      </div>
    </main>
  );
}
