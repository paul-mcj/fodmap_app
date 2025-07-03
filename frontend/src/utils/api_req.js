import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
	withCredentials: true // crucial so that cookies (like access/refresh tokens) are set on the browser.
});

// Auth
export const login = (credentials) => API.post("users/token/", credentials);
export const logout = () => API.post("users/logout/");
export const register = (info) => API.post("users/register/", info);

// Foods
export const fetchFoods = () => API.get("foods/");
// export const addFood = (foodData) => API.post("foods/", foodData); #TODO: CRUD functions like this for all project apps

// Posts
export const fetchPosts = () => API.get("posts/");
export const getUserPosts = () => API.get("posts/user/");

// Users
export const getUser = () => API.get("users/me/");
export const fetchUsers = () => API.get("users/");

// Journal Entries
export const getUserJournalEntries = () => API.get("journals/me/");
export const postNewJournalEntry = (data) => API.post("journals/new/", data);
