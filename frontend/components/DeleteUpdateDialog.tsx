"use client";

import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import {AiOutlineLoading} from 'react-icons/ai'
import { useState } from "react";
import { DeletPost } from "@/_actions";
import {useRouter} from 'next/navigation'
import ErrorMessage from "./ErrorMessage";
import Link from "next/link";

type Props = {
    id:number
}

export default function DeleteUpdateDialog({id}:Props) {

    const router = useRouter();

    const [Load, setLoad] = useState(false)
    const [Error, setError] = useState(false)

    const HandleDeleteDialog = () => {
        document.getElementById("dialog-delete")?.classList.remove("hidden");
        document.getElementById("dialog-delete")?.classList.add("flex");
    }
    
    const HandleNoDelete = () => {
        document.getElementById("dialog-delete")?.classList.remove("flex");
        document.getElementById("dialog-delete")?.classList.add("hidden");
    }

    const HandleDelete = async () => {
        setError(false);
        setLoad(true);
        HandleNoDelete();
        const res = await DeletPost(id);

        if(res.behavior === 'OK'){
            router.replace("/");
        }
        else
        {
            setLoad(false);
            setError(true);
        }
    }

    return (
        <div className='flex items-center space-x-2 mr-3 sm:mr-10'>
            <Link href={`/blog-post/update/${id}`} className='text-xs flex items-center p-1 px-2 rounded  hover:bg-stone-500  hover:text-stone-100 transition duration-300'><BiEditAlt/>Edit</Link>
            
            <button onClick={HandleDeleteDialog} className=' relative text-xs sm:text-sm bg-red-500  text-white flex items-center p-1 px-2 rounded  hover:bg-red-700 hover:text-white transition duration-300'><MdDeleteOutline/>Delete</button>


            <div id='dialog-delete' className='hidden pop-up text-xs absolute w-fit sm:top-10 top-7 sm:right-5 right-2 px-5 space-x-3 py-2 text-black border-black border-2 bg-white rounded-md items-center'>
                <p>you sure deleting this?</p>
                <button onClick={HandleDelete} className='sm:p-2 p-1 px-3 hover:bg-red-700 transition duration-300 bg-red-500 text-white sm:px-4 rounded-md'>Yes</button>
                <button onClick={HandleNoDelete} className='sm:p-2  hover:bg-stone-700  transition duration-300 p-1 px-3 text-white bg-stone-500 sm:px-4 rounded-md'>No</button>
            </div>

            {Load && <div className="fixed flex justify-center items-center top-0 left-0 right-3 bottom-0 bg-white">
                <div className="flex items-center pop-up flex-col space-y-2">
                    <p>please wait...</p>
                    <p className=" animate-spin"><AiOutlineLoading/></p>
                </div>
            </div>}

            {Error && <ErrorMessage/>}
        </div>
  )
}
