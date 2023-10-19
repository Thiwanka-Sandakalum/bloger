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

type BadResponse = {
    error : string
    reason : string
}