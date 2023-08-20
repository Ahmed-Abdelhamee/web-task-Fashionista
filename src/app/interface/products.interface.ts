export interface shop{
    shopName:string,
    logo:string,
    phone:string,
    location:string,
    id:string
    // productList:products[]
}

export interface products{
    productPhoto:string,
    gender:string,
    type:string,
    price:string,
    details:string,
    shopPhone:string,
    offer:string,
    id:string
}
export interface msg{
    name:string,
    phone:string,
    email:string,
    msg:string,
    id:string,
}