import axios from "axios";

const api = axios.create({
  baseURL: "https://demohotelsapi.pythonanywhere.com",
});

export const fetchHotels = async () => {
  try {
    const response = await api.get("/hotels/");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default api;