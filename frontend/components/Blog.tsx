
import Image from "next/image";
import Link from "next/link";
import thumbnail from '../public/Thumbnail.jpeg'
import { GetThumbnail } from "@/_actions";

type Props = {
  Post:BlogPostData
}

export default async function Blog({Post:{id , title , content }}:Props) {

  const res = await GetThumbnail(title);
  return (
    <Link href={`/blog-post/${id}`} className=" col-span-4 lg:col-span-2 w-full bg-white drop-shadow-lg relative overflow-hidden text-white rounded">
        <div className="hover:scale-105 scale-100 transition-all duration-300 ease-out bg-black/60 p-5">
          <h1 className="text-3xl px-5 capitalize font-semibold underline">{title}</h1>
          <p className="text-stone-100 font-bold mt-1 px-5 pt-1 line-clamp-5 lg:line-clamp-6 text-sm">{content}</p>  
        </div>
        
        {res?.behavior === 'OK' && <Image src={!res.data.photos[0] ? thumbnail : res.data.photos[0].src.landscape ? res.data.photos[0].src.landscape : res.data.photos[0].src.medium ? res.data.photos[0].src.medium : res.data.photos[0].src.original} alt="thumbnail" width={1280} height={768} className="absolute top-0 left-0 right-0 bottom-0 h-full -z-10 object-cover"/>}
        {res?.behavior === 'NOT_OK' &&  <Image src={thumbnail} alt="thumbnail" width={1280} height={768} className="absolute top-0 left-0 right-0 bottom-0 -z-10 object-cover"/>}
    </Link>
  )
}
