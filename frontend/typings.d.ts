type BlogFormData = {
    title:string
    content:string
    author:string
}

type BlogPostData = {
    id:number
    title:string 
    content:string 
    author:string 
    date:string
}

type ServerResponse = | {
    behavior : "OK"
    code : number 
    data:BlogPostData
} | {
    behavior : "NOT_OK" 
    code: number 
    message : BadResponse 
}


type PixelResponse = | {
    behavior : "OK"
    code : number 
    data:PhotData
} | {
    behavior : "NOT_OK" 
    code: number 
    message : BadResponse 
}


type FeedResponse = | {
    behavior : "OK"
    code : number 
    data:BlogPostData[]
} | {
    behavior : "NOT_OK" 
    code: number 
    message : BadResponse 
}


type BadResponse = {
    error : string
    reason : string
}

type PhotData = {
    photos:{
        src:{
            landscape:string
            original:string
            medium:string
        }    
    }[]
    
}