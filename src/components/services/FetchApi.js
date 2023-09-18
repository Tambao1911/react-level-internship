import axios from "~/components/services/cutomixe-axios";

function FetchApiUsers(page) {
    return axios.get(`/api/users?page=${page}`)
}

const postCreteUser = (name, job) => {
    return axios.post('/api/users', { name, job })
}

const updateUser = (id, name, job) => {
    return axios.put(`/api/users/${id}`, { name, job })
}

const deleteUser = (id) => {
    return axios.put(`/api/users/${id}`)
}

export { FetchApiUsers, postCreteUser, updateUser, deleteUser };