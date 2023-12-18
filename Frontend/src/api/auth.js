import axios from "axios";


const API = 'http://localhost:3000/api/auth';
export const registerRequest = user => axios.post(`${API}/signup`, user);
