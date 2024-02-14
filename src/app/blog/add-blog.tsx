/*
|-----------------------------------------
| setting up Add Page for the Blog App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/

/**
 * $ This file is part redux store. Not rtk-query. Also it is not using api
 * */

import {toast} from 'react-toastify';
import {RxCross2} from 'react-icons/rx';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Dispatch, SetStateAction} from 'react';

import {zodResolver} from '@hookform/resolvers/zod';

import {addBlog} from '@/redux/features/blog/blogSlice';
import {appDispatch, useAppSelector} from '@/redux/app/store';

import {blogsDataSchema, blogsDataSubmitType} from './page';

export default function AddBlog({
  data,
}: {
  data: {
    register: any;
    handleSubmit: any;
    formState: any;
    handleCancel: () => void;
    setCurrentRender: Dispatch<SetStateAction<string>>;
  };
}) {
  const {data: globalStoreBlog} = useAppSelector(state => state.blogs);
  const {handleCancel, setCurrentRender, handleSubmit, register, formState} =
    data || {};
  const {errors} = formState || {};

  // create dispatch for dispatch a function
  const dispatch = useDispatch<appDispatch>();

  // create form by using zod and react-hook-form
  // const {
  //   register,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm<blogsDataSubmitType>({
  //   resolver: zodResolver(blogsDataSchema),
  // });

  // when add
  const onSubmit = (data: blogsDataSubmitType) => {
    const getLatestId = (): number =>
      globalStoreBlog.reduce(
        (acc, curr) => (curr.id > acc ? curr.id + 1 : acc),
        0,
      );
    // Dispatch function to add blog to store
    dispatch(
      addBlog({
        id: getLatestId(),
        title: data.name,
      }),
    );
    toast.success('Blog Add Success');
    setCurrentRender('');
  };

  return (
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
            className="bg-green-400 px-4 py-2 rounded-lg uppercase cursor-pointer absolute bottom-4 right-4"
          />
        </form>
      </div>
    </main>
  );
}
