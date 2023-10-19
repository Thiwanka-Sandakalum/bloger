"use client";

import {useState} from 'react'
import { CreatePost } from '@/_actions';
import {useForm , SubmitHandler } from 'react-hook-form'
import { BeatLoader } from 'react-spinners';
import {DateTime} from 'luxon'
import {IoIosClose} from 'react-icons/io'
import {LiaPoopSolid} from 'react-icons/lia'
import {BiError} from 'react-icons/bi'

export default function FormCreate() {

  const {register , handleSubmit , reset , formState:{errors}} = useForm<BlogFormData>();
  const [Result, setResult] = useState<ServerResponse>();

  const [Load, setLoad] = useState(false)

  const HandleSubmit:SubmitHandler<BlogFormData> = async (formData) => {
    setLoad(true)
    const res = await CreatePost(formData);
    setResult(res);
    reset();
    setLoad(false)
    
    console.log(res)
  }

  const HandleClose = () => {
    setResult({} as ServerResponse)
  }

  return (
    <form onSubmit={handleSubmit(HandleSubmit)} className="w-full mt-8 sm:mt-5 text-sm text-slate-600 font-light">
          <label htmlFor="title">* Title</label>
        <input style={errors.title && {"borderColor":"rgb(248, 113, 113)"}} {...register("title" , {required:"* required field !"})}  id="title" type="text" autoComplete="off" className=" w-full px-4 p-2 border border-slate-300 bg-slate-50 my-1 rounded-sm outline-none focus:border-green-500 transition duration-300" />
        {errors.title && <p className='text-xs text-red-600 my-1  italic'>{errors.title.message}</p>}

        <label htmlFor="content">* Content</label>
        <textarea style={errors.content && {"borderColor":"rgb(248, 113, 113)"}} {...register("content" , {required:"* required field !"})}  id="content" rows={5} className=" w-full px-4 p-2 border border-slate-300 bg-slate-50 my-1 rounded-sm outline-none focus:border-green-500 transition duration-300"></textarea>
        {errors.content && <p className='text-xs text-red-600 my-1  italic'>{errors.content.message}</p>}

        <label htmlFor="author">* Author</label>
        <input  style={errors.author && {"borderColor":"rgb(248, 113, 113)"}} {...register("author" , {required:"* required field !"})} id="author" type="text" autoCapitalize="off" autoComplete='off' className=" w-full px-4 p-2 border border-slate-300 bg-slate-50 my-1 rounded-sm outline-none focus:border-green-500 transition duration-300" />
        {errors.author && <p className='text-xs text-red-600 my-1  italic'>{errors.author.message}</p>}

        {Load ? <button className="w-full p-3 bg-teal-600 cursor-wait text-teal-50 uppercase font-semibold tracking-wider mt-3 rounded-sm  flex items-center justify-center"> <p>please wait</p><BeatLoader color="#EDFCF9" size={8} /></button> :
        <button className="w-full p-3 bg-slate-500 text-slate-50 uppercase font-semibold tracking-wider mt-3 rounded-sm hover:bg-slate-800 hover:text-white transition duration-300 active:bg-slate-300 active:text-slate-800">Create Post</button>}

        {Result?.behavior === 'OK' && <div className='absolute z-10 top-0 left-0 flex justify-center items-center w-full bottom-0 bg-black/20'>
          <div className='w-full relative pop-up sm:w-[80%] h-fit p-5 bg-white rounded-lg'>
            <h1 className='ml-3 text-black text-lg'>You've Created a New Post Successfully.</h1>
            <div className='w-fit p-3 mx-auto mb-2'>
              <p className='text-lg text-black capitalize'>Title:</p>
              <p className='text-2xl text-black'>{Result.data.title}</p>
              <p className='mt-3'>Content:</p>
              <p  className='w-full h-[100px] overflow-hidden overflow-y-scroll pr-2'>{Result.data.content}</p>
            </div>
            <div className='w-full flex items-center justify-between mr-10'>
              <p className='text-xs ml-3 text-black font-thin'>code : {Result.data.id}</p>
              <div>
                <p className=' text-right text-xs'>Auther : {Result.data.author}</p>
                <p className=' text-right text-xs'> Date: { DateTime.fromISO(Result.data.date, {zone:'utc'}).toFormat("yyyy-MM-dd HH:mm:ss")}</p>
              </div>
            </div>
            <button onClick={HandleClose} type='button' className='absolute top-2 right-3 text-2xl text-slate-600 hover:text-red-500 hover:scale-105 focus:scale-95 transition-all duration-300'><IoIosClose/></button>
          </div>
        </div>}

        {Result?.behavior === 'NOT_OK' && <div className='absolute z-10 top-0 left-0 flex justify-center items-center w-full bottom-0 bg-black/20'>
          <div className='relative pop-up w-[80%] h-fit p-5 sm:p-10 bg-red-500 text-white rounded-lg '>
            <div className=' flex justify-between w-full items-center'>
            <h1 className='sm:text-3xl text-xl'><BiError/></h1>
            <div className='flex-1 px-5 sm:px-10'>
              <h1 className=' sm:text-lg capitalize flex items-center'><p>It's seems you have got into a trouble</p> <p className='hidden sm:block'><LiaPoopSolid/></p></h1>
              <p>contact developer for helps</p>
            </div>
            </div>
          <button onClick={HandleClose} type='button' className='absolute top-2 right-3 text-2xl text-white hover:text-black hover:scale-105 focus:scale-95 transition-all duration-300'><IoIosClose/></button>
          </div>
        </div>}

    </form>
  )
}