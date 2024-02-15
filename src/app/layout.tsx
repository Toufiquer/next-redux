import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ReduxProvider} from '@/redux/provider';
import Link from 'next/link';

  import {ToastContainer, toast} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-between px-4 py-2  uppercase">
          <Link href="/">Home</Link>
          <ul className="flex items-center justify-between gap-4">
            <li>
              <Link href="/">user</Link>
            </li>
            <li>
              <Link href="/post">Post</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/assignment">Assignment</Link>
            </li>
          </ul>
        </nav>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
