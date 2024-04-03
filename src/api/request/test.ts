import request from "@/utils/request"

const baseURL = import.meta.env.APP_BASE_API

export const getAll = () => {
    return request.get(`${baseURL}`)
}

export const getOne = (id:number) => {
    return request.get(`${baseURL}/${id}`)
}

export const page = (num:number, size:number) => {
    return request.get(`${baseURL}/page`,{
        params:{
            num:num,
            size:size
        }
    })
}

export const addOne = (name:string, age:number) => {
    return request.put(`${baseURL}`,{
        name:name,
        age:age
    })
}

export const updateOne = (name:string, age:number) => {
    return request.post(`${baseURL}`,{
        name:name,
        age:age
    })
}

export const deleteOne = (id:number) => {
    return request.delete(`${baseURL}/${id}`)
}