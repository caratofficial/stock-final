import Head from 'next/head'
import { BiUserPlus } from "react-icons/bi";
import Table from '@/components/table';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section>
      <Head>
        <title>CRUD Application</title>
       
      </Head>
      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Supplier Management</h1>
       <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
          <Link href="/addsupplier">
            <button className="flex bg-blue-500 text-white px-3 py-2 rounded-md hover:border-green-600 hover:text-gray-800">
              Create new Supplier <span className='px-1'><BiUserPlus size={20}></BiUserPlus></span>
              </button>
              </Link>    
            </div>



        </div>

        <div className="container mx-auto">
        <Table></Table>
        </div>
      </main>
    </section>
  )
}
