import FormUpdate from "@/components/FormUpdate";
import axios, { AxiosError } from "axios";
import { Metadata } from "next";
import { Raleway } from "next/font/google";



const raleway = Raleway({subsets:['latin'] , weight:['100' , '200' , '300' , '400' , '500' ,'600' , '700' , '800' , '900']})


type Props = {
  params:{
      id:number
  }
}


export const metadata:Metadata = {
  title:`Update Post`
}


async function GetPost(id:number):Promise<ServerResponse> {
  return await new Promise(async(resolve) => {
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

  const res = await GetPost(id);

  //dummy data
  // const res:ServerResponse = {behavior:'OK' , code:200 , data:{id , title:`Isn't the universe amazing ?
  // ` , content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." , date:"2023-10-19T13:00:00.000Z" , author:"Nipuna Nishan"}}


  if(res.behavior === 'OK'){
    return (
      <div className={`${raleway.className} fade-in w-full sm:w-[80%] xl:w-[60%] mx-auto p-10 mt-5 sm:mt-20`}>
        <h1 className="text-4xl sm:text-5xl font-bold">Update Post</h1>
        <div>
          <FormUpdate post={res.data}/>
        </div>
      </div>
    )
  }
  else
  {
    return(
      <div className='text-sm font-light p-5'>
          <h1>oops! something went wrong</h1>
          <p>it looks like there is no any post for id - {id} :/</p>
      </div>
    )
  }
}
