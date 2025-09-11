import axios from "axios";

// functions that consume this callback require authentication
const PRIVATE_API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true // crucial so that cookies (like access/refresh tokens) are set on the browser.
});

// any endpoint that calls this does not need to authenticate the user
const PUBLIC_API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: false // Do NOT send cookies for public endpoints
});

// Users (private routes)
export const privateLogin = (credentials) =>
	PRIVATE_API.post("users/token/", credentials);
export const privateLogout = () => PRIVATE_API.post("users/logout/");
export const privateRegistration = (info) => {
	const formData = new FormData();
	formData.append("username", info.username);
	formData.append("email", info.email);
	formData.append("password", info.password);
	formData.append("bio", info.bio || "");

	// Only append profile image if user selected one
	if (info.profileImage) {
		formData.append("profile_image", info.profileImage);
	}

	return PRIVATE_API.post("users/register/", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
};
export const privateGetUserData = () => PRIVATE_API.get("users/me/");
// TODO: ability for logged in user via private routes to CRUD their user info

// Users (public routes)
// FIXME:
export const publicGetUserData = (username) =>
	PUBLIC_API.get(`users/${username}/`);
export const publicGetAllUsers = () => PUBLIC_API.get("users/");
export const publicCheckUsername = (username) =>
	PUBLIC_API.get(
		`users/check-username/?username=${encodeURIComponent(username)}`
	);
export const publicCheckEmail = (email) =>
	PUBLIC_API.get(`users/check-email/?email=${encodeURIComponent(email)}`);

// Blogs (private routes)
// FIXME: currently working on these two functions:
export const privateGetUserBlogs = () => PRIVATE_API.get("blogs/my/");

// Blogs (public routes)
export const publicGetAllBlogs = () => PUBLIC_API.get("blogs/");
export const publicGetSingleBlog = (id) => PUBLIC_API.get(`blogs/${id}/`);
export const publicGetAllBlogsOfType = (type) => PUBLIC_API.get(`/${type}/`); // get either all "discussions" or "recipes"

// TODO: need update and delete functions (discussions and recipes)

// Discussions (private routes)
export const privateGetUserDiscussions = () =>
	PRIVATE_API.get("/discussions/my");
export const privatePostNewDiscussion = (content) =>
	PRIVATE_API.post("/discussions/", content);

// Discussions (public routes)

// Recipes (private routes)
export const privateGetUserRecipes = () => PRIVATE_API.get("/recipes/my");
// Recipes (public routes)

// Posts (private routes)
export const privateGetUserPosts = () => PRIVATE_API.get("posts/user/");
// TODO: CRUD add, update, and delete functions
// TODO: need a function to get all posts by a specific private user

// Posts (public routes)
// TODO: needs to change to only get posts from one specific blog at a time
export const publicGetAllPosts = () => PUBLIC_API.get("posts/");
// TODO: need a function to get the most recent post of any given blog

// Journals (private routes only)
export const privateGetUserJournalEntries = () => PRIVATE_API.get("journals/");
export const privatePostUserJournalEntry = (body) =>
	PRIVATE_API.post("journals/", { body });
// TODO: need delete function (no updating allowed)

// Foods (private routes)
// TODO: CRUD add, update, and delete functions

// Foods (public routes)
export const publicGetAllFoods = () => PUBLIC_API.get("foods/");
export const publicSearchFoods = async (query) => {
	const res = await PUBLIC_API.get(
		`/foods/search/?q=${encodeURIComponent(query)}`
	);
	return res.data;
};
// export const publicPostFoodData = (foodData) => PUBLIC_API.post("foods/", foodData);
