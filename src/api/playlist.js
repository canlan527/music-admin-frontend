import request from '@/utils/request'
const baseURL = 'http://localhost:3010'
export function fetchList(params){
    return request({
        params,
        url: `${baseURL}/playlist/list`,
        method: 'get',
    })
}
export function fetchById(params) {
    return request({
        params,
        url: `${baseURL}/playlist/getById`,
        method: 'get'
    })
}
export function update(params){
    return request({
        data: {
            ...params
        },
        url: `${baseURL}/playlist/updatePlaylist`,
        method: 'post'
    })
}
export function del(params){
    return request({
        params,
        url: `${baseURL}/playlist/del`,
        method: 'get'
    })
}

