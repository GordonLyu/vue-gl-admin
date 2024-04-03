import { mock } from "mockjs";

const userList = [{
    uid: 1,
    username: 'admin',
    password: '123456'
}, {
    uid: 2,
    username: 'admin1',
    password: '123456'
}, {
    uid: 3,
    username: 'admin2',
    password: '123456'
}]

export const getAll = () => {
    mock('/mock/users', 'get', userList)
}

export const getOne = () => {
    const t = (uid: number) => {
        let user = {}
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].uid == uid) {
                user = userList[i];
                break;
            }
        }
        return user;
    }
    mock(/\/mock\/users\/[0-9]/, 'get', (option) => {
        let uid = Number(option.url.substring(option.url.lastIndexOf('/') + 1));
        return t(uid);
    })
}

