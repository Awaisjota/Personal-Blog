import API from "../api/api.js";

export const fetchPosts = async () => {
  const { data } = await API.get("/posts");
  return data;
};

export const addPost = async (postData) => {
  const { data } = await API.post("/posts", postData); // ✅ FormData bheji
  return data;
};

export const fetchById = async (id) => {
  const { data } = await API.get(`/posts/${id}`);
  return data;
};

export const updatePost = async (id, updatedData) => {
  const { data } = await API.put(`/posts/${id}`, updatedData); // ✅ FormData
  return data;
};
export const deletePost = async (id) => {
  const { data } = await API.delete(`/posts/${id}`);
  return data;
};

export const likePost = async (id) => {
  const { data } = await API.put(`posts/${id}/like`); // ✅ correct
  return data;
};

export const addComment = async ({ id, text }) => {
  const { data } = await API.post(`posts/${id}/comment`, { text }); // ✅ POST
  return data;
};
