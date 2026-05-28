export interface AddBlogPostRequest{
    title:string,
    shortDescription:string,
    content:string,
    featuredImageUrl:string,
    urlHandle:string,
    author:string,
    publishedDate:Date,
    isVisible:boolean
}


export interface BlogPost{
    id:string,
    title:string,
    shortDescription:string,
    content:string,
    featuredImageUrl:string,
    urlHandle:string,
    author:string,
    publishedDate:Date,
    isVisible:boolean
}