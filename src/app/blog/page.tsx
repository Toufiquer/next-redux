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
import {useForm} from 'react-hook-form';

import {zodResolver} from '@hookform/resolvers/zod';

import AddBlog from './add-blog';
import DeleteUI from './delete-ui';
import EditUI from './edit';
import InitRender from './init-ui';

// Zod schema
export const blogsDataSchema = z.object({
  name: z.string().min(1, {message: 'Required'}),
});

export type initSingleBlogDataType = {title: string; id: number};
export const initSingleBlogData: initSingleBlogDataType = {
  title: 'Blog title',
  id: 0,
};
export type blogsDataSubmitType = z.infer<typeof blogsDataSchema>;

export default function Home() {
  const [blogsData, setBlogsData] =
    useState<initSingleBlogDataType>(initSingleBlogData);
  const [currentRender, setCurrentRender] = useState<string>('');
  const handleCancel = () => {
    setBlogsData(initSingleBlogData);
    setCurrentRender('');
  };

  // create form by using zod and react-hook-form
  const {register, handleSubmit, setValue, formState} =
    useForm<blogsDataSubmitType>({
      resolver: zodResolver(blogsDataSchema),
    });
  // Init Render || All Blogs
  let renderUI = (
    <InitRender data={{handleCancel, setCurrentRender, setBlogsData}} />
  );

  // Delete UI
  if (currentRender === 'delete') {
    renderUI = <DeleteUI data={{handleCancel, setCurrentRender, blogsData}} />;
  }

  // Update UI
  if (currentRender === 'edit') {
    setValue('name', blogsData.title);
    renderUI = (
      <EditUI
        data={{
          handleCancel,
          setCurrentRender,
          register,
          handleSubmit,
          formState,
          blogsData,
        }}
      />
    );
  }

  // Add UI
  if (currentRender === 'add') {
    renderUI = (
      <AddBlog
        data={{
          handleCancel,
          setCurrentRender,
          register,
          handleSubmit,
          formState,
        }}
      />
    );
  }
  return renderUI;
}

