import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons/';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const saveNumber = (number) => {
    const postedPromise = axios.post(baseUrl, number);
    return postedPromise.then(response => response.data)
};

const deleteNumber = (id) => {
    const promise = axios.delete(`${baseUrl}${id}`);
    return promise.then()
};

export default {getAll, saveNumber, deleteNumber}