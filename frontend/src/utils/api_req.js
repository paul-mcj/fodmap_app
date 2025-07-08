import axios from "axios";

// functions that consume this callback require authentication
const PRIVATE_API = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
	withCredentials: true // crucial so that cookies (like access/refresh tokens) are set on the browser.
});

// any endpoint that calls this does not need to authenticate the user
const PUBLIC_API = axios.create({
	baseURL: "http://127.0.0.1:8000/api/",
	withCredentials: false // Do NOT send cookies for public endpoints
});

// Users
export const privateLogin = (credentials) =>
	PRIVATE_API.post("users/token/", credentials);
export const privateLogout = () => PRIVATE_API.post("users/logout/");
export const privateRegistration = (info) =>
	PRIVATE_API.post("users/register/", info);
export const privateGetUserData = () => PRIVATE_API.get("users/me/");
export const publicGetAllUsers = () => PUBLIC_API.get("users/");

// Foods
// TODO: CRUD add, update, and delete functions
export const publicGetAllFoods = () => PUBLIC_API.get("foods/");
// export const publicPostFoodData = (foodData) => PUBLIC_API.post("foods/", foodData);

// Blogs
// TODO: CRUD add, update, and delete functions
export const publicGetAllBlogs = () => PUBLIC_API.get("blogs/");
export const privateGetUserBlogs = () => PRIVATE_API.get("blogs/my/");
export const privatePostNewBlog = (content) =>
	PRIVATE_API.post("blogs/my/", content);

// Posts
// TODO: CRUD add, update, and delete functions
export const publicGetAllPosts = () => PUBLIC_API.get("posts/");
export const privateGetUserPosts = () => PRIVATE_API.get("posts/user/");

// Journals
// TODO: CRUD add, update, and delete functions
export const privateGetUserJournalEntries = () => PRIVATE_API.get("journals/");
export const privatePostUserJournalEntry = (body) =>
	PRIVATE_API.post("journals/", { body });
