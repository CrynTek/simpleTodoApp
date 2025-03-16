import axios from 'axios';

const API_URL = 'https://679b2d8d33d316846322f5c4.mockapi.io/todos';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getTodoById = async (id:number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo: any) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (todo: { id: any; }) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: any) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
