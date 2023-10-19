import FormCreate from '@/components/FormCreate'
import {Metadata} from 'next'

export const metadata:Metadata = {
    title:"Create New Blog Post"
}

export default function page() {
    return (
    <main>
        <div className="flex w-full h-screen justify-center items-center">
            <div className=" p-10 w-full sm:w-[80%] xl:w-1/2 bg-white rounded sm:drop-shadow-lg">
                <h1 className="sm:text-4xl text-4xl text-slate-600 underline sm:no-underline font-extralight w-fit tracking-tight">Create a New Blog Post</h1>
                <FormCreate/>
            </div>
        </div>
    </main>
  )
}
