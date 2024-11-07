import axios from "axios";

const baseURL = "http://localhost:3000/words/";

const handleError =
  (fn) =>
  async (...params) => {
    try {
      return await fn(...params);
    } catch (error) {
      console.log("Error in API call:", error);
      return null;
    }
  };

export const api = {
  getWord: handleError(async (id) => {
    const res = await axios.get(baseURL + id);
    // console.log("res", res);
    return res.data;
  }),
  getWords: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteWord: handleError(async (id) => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createWord: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateWord: handleError(async (payload) => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  }),
};
