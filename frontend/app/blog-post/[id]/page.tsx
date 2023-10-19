import axios, { AxiosError } from 'axios'
import { DateTime } from 'luxon'
import {Metadata} from 'next'
import {Raleway} from 'next/font/google'
import { BiEditAlt } from 'react-icons/bi'
import {FaBloggerB} from 'react-icons/fa'
import {MdDeleteOutline} from 'react-icons/md'

type Props = {
    params:{
        id:number
    }
}

const raleway = Raleway({subsets:['latin'] , weight:['100' , '200' , '300' , '400' , '500' ,'600' , '700' , '800' , '900']})

export const metadata:Metadata = {
    title:`Post`
}

async function GetPost(id:number):Promise<ServerResponse> {
    return new Promise(async(resolve) => {
        try {
            const res = await axios.get(`${process.env.ROOT_URL}/api/posts/${id}`)
            resolve ({
                behavior:"OK",
                code:res.status,
                data:res.data
            } as ServerResponse)

        } catch (error:any) {
            if(error instanceof AxiosError)
            {
                resolve({
                    behavior:'NOT_OK',
                    code:error.status,
                    message:{
                        error:`${error.name} | ${error.cause}`,
                        reason:error.message
                    }   as BadResponse
                } as ServerResponse)
            }
            else
            {
                resolve({
                    behavior:'NOT_OK',
                    code:500,
                    message:{
                        error:`${error.name}`,
                        reason:error.message
                    }   as BadResponse
                } as ServerResponse)
            }
        }
    })
}


export default async function page({params:{id}}:Props) {

    // const res = await GetPost(id);

    const res:ServerResponse = {behavior:'OK' , code:200 , data:{id , title:`Isn't the universe amazing ?
    ` , content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." , date:"2023-10-19T13:00:00.000Z" , author:"Nipuna Nishan"}}

    return (
        <main className={`${raleway.className} w-full bg-white`}>
            <div className='w-[80%] 2xl:mt-32 mt-20 mx-auto'>
                {res.behavior === 'OK' && 
                    <div>
                        <h1 className='text text-5xl font-bold border-b-4 border-t-4 py-2 border-b-black border-t-black rounded-md w-fit flex items-center'><FaBloggerB/>log Post</h1>
                        <div className='w-full sm:w-[80%] mt-14 sm:mt-20 mx-auto'>
                            <h1 className=' text-3xl sm:text-5xl capitalize text-stone-800 font-semibold leading-8 sm:leading-[50px] sm:tracking-wide'>{res.data.title}</h1>
                            <div className='w-full mt-5 sm:mt-10 sm:mb-3 mb-1 sm:text-xl  flex justify-between items-center'>
                                <h1 className='text-lg font-semibold '>Article ,</h1>
                                
                                <div className='flex items-center space-x-2 mr-3 sm:mr-10'>
                                    <button className='text-xs flex items-center p-1 px-2 rounded  hover:bg-stone-500  hover:text-stone-100 transition duration-300'><BiEditAlt/>Edit</button>
                                    
                                    <button className='text-xs bg-red-500 text-white flex items-center p-1 px-2 rounded  hover:bg-red-700 hover:text-white transition duration-300'><MdDeleteOutline/>Delete</button>
                                </div>
                            </div>
                            <p className='p-1 text-stone-600 text-md sm:text-lg'>{res.data.content}</p>
                            <div className='flex justify-between items-center mt-10 text-sm text-stone-600'>
                                <p >Author : {res.data.author}</p>
                                <p>Date : {DateTime.fromISO(res.data.date, {zone:'utc'}).toFormat("yyyy-MM-dd HH:mm:ss")}</p>
                            </div>
                        </div>
                    </div>}
            </div>
        </main>
    )
}
