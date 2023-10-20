import Blog from "@/components/Blog";
import axios, { AxiosError } from "axios";
import { FaBloggerB } from "react-icons/fa";



async function GetFeed():Promise<FeedResponse> {
  return await new Promise(async(resolve) => {
      try {
          const res = await axios.get(`${process.env.ROOT_URL}/api/posts`)
          resolve ({
              behavior:"OK",
              code:res.status,
              data:res.data
          } as FeedResponse)

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
              } as FeedResponse)
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
              } as FeedResponse)
          }
      }
  })
}



export default async function page() {

  const res = await GetFeed();


  return (
    <main className="w-[80%] mt-20 mx-auto">
      <h1 className='text text-5xl font-bold border-b-4 border-t-4 py-2 border-b-black border-t-black rounded-md w-fit flex items-center'><FaBloggerB/>logger</h1>
      <h1 className="text-xs">It is Dummy Do Not Worry</h1>

      <h1 className="mt-10 ml-3 text-3xl font-semibold mb-5">Feed</h1>
      <div className="w-full grid grid-cols-4  gap-10 transition-all duration-300">
        {res.behavior === 'OK' && res.data.map((post) => {
          return(
            <Blog key={post.id} Post={post}/>
          )
        })}
      </div>
      {res.behavior === 'NOT_OK' && <p className="text-sm text-stone-600 text-center mt-10 underline">oops! nothing to see here...</p>}
    </main>
  )
}
