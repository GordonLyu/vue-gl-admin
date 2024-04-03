import Mock from 'mockjs'
export const test = () => {
    Mock.mock('/mock/test', 'get', {
        code: 200,
        msg: '成功',
        data: '测试'
    })
}