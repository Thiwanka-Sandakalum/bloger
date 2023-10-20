import axios , {AxiosError} from 'axios';

const ROOT_URL = process.env.ROOT_URL





export async function CreatePost(formData:BlogFormData):Promise<ServerResponse> {
    return new Promise( async (resolve) => {
        try {
            
            const result = await axios.post(`${ROOT_URL}/api/posts` , formData , {
                headers:{
                    "Content-Type":"application/json"
                    
                },timeout:5000
            })
            
            resolve({
                behavior:'OK',
                code:result.status,
                data:result.data as BlogPostData
            } as ServerResponse)
        }
        catch (error:any) {

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



export async function UpdatePost(formData:BlogFormData , id:number):Promise<ServerResponse> {
    return new Promise( async (resolve) => {
        try {
            
            const result = await axios.put(`${ROOT_URL}/api/posts/${id}` , formData , {
                headers:{
                    "Content-Type":"application/json"
                    
                },timeout:5000
            })
            
            resolve({
                behavior:'OK',
                code:result.status,
                data:result.data as BlogPostData
            } as ServerResponse)
        }
        catch (error:any) {

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

export async function DeletPost(id:number):Promise<ServerResponse> {
    return new Promise( async (resolve) => {
        try {

            const result = await axios.delete(`${ROOT_URL}/api/posts/${id}`);
            
            resolve({
                behavior:'OK',
                code:result.status,
                data:result.data as BlogPostData
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


export async function GetThumbnail(title:string):Promise<PixelResponse> {
    return new Promise( async (resolve) => {
        try {

            const result = await axios.get(`https://api.pexels.com/v1/search?query=${title}&per_page=1&orientation=landscape&size=medium`,{
                headers:{
                    "Authorization":process.env.API_KEY_PIXELS as string
                }
            });
            
            resolve({
                behavior:'OK',
                code:result.status,
                data:result.data
            } as PixelResponse)
            
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
                } as PixelResponse)
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
                } as PixelResponse)
            }
        }
    })
}