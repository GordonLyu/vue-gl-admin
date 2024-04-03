import request from "@/utils/request"

const baseURL = '/mock';

export const test = () => {
    return request.get(`${baseURL}/test`)
}