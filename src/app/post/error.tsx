/*
|-----------------------------------------
| setting up Error for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, February, 2024
|-----------------------------------------
*/
'use client';

import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

const Error = ({
  errorMessage = '',
}: {
  errorMessage: string | FetchBaseQueryError | SerializedError;
}) => {
  return (
    <main className="h-screen w-full fixed flex items-center justify-center">
      <p className="text-rose-400">{errorMessage.toString()}</p>
    </main>
  );
};
export default Error;
