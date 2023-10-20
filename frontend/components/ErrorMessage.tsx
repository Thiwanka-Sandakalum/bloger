"use client";

import { BiError } from "react-icons/bi";


export default function ErrorMessage() {
  return (
    <div className="flex pop-up-gone text-xs absolute w-fit sm:top-5 top-2 sm:right-5 right-2 px-5 space-x-3 py-2 text-white bg-red-500 rounded-md items-center">
        <p className="sm:text-4xl text-3xl"><BiError/></p>
        <div>
            <p className="sm:text-lg text-md font-bold">Sorry</p>
            <p >your request cannot perform at this time.</p>
        </div>
    </div>
  )
}
