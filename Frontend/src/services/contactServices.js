import API from "../api/api";

export const postContact = async (data) => {
  try {
    const response = await API.post("/contact", data); // ✅ DATA PASS KIYA
    return response.data;
  } catch (error) {
    console.error("Error posting contact: ", error);
    throw error;
  }
};

export const getContact = async () => {
  try {
    const response = await API.get("/contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
    throw error;
  }
};
