import request from "@/utils/request"

export const getAll = () => {
    return request.get('/mock/users');
}

export const getOne = (uid:number) => {
    return request.get(`/mock/users/${uid}`);
}