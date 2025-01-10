import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const createAnecdote = async (content) => {
        const response = await axios.post(baseUrl, content);
        return response.data;

};

const updateAnecdote = async (updatedAnecdote) => {
    const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote);
    return response.data;
};

export default{ getAll, createAnecdote, updateAnecdote };


