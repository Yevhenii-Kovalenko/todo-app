import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTodos = async () => {
  const { data } = await axios.get(`${API_URL}?_limit=10`);
  return data;
};

export const addTodo = async (newTodo) => {
  const { data } = await axios.post(API_URL, newTodo);
  return data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
