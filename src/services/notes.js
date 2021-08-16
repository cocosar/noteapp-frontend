/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const baseUrl = "/api/notes"
// const baseUrl = "http://localhost:3003/notes"


let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}
const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = async (content) => {
	const config = {
		headers: { Authorization: token },
	}
    const object = { content, important: false }
	const response = await axios.post(baseUrl, object, config)
	return response.data
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then((response) => response.data)
}

export default {
	getAll,
	create,
	update,
	setToken,
}
