import axios from "axios";
import { setUserData } from "../redux/userSlice";

// Export the api instance as well so it can be used if needed
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
  withCredentials: true,
});

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await api.get("/user/currentUser");
    dispatch(setUserData(result.data));
    return true;
  } catch (error) {
    dispatch(setUserData(null));
    return false;
  }
};

export const generateNotesApi = async (payload) => {
  const result = await api.post("/notes/generate-notes", payload);
  return result.data;
};

export const getHistoryApi = async () => {
  const result = await api.get("/history/my-notes");
  return result.data;
};

export const createOrderApi = async (amount) => {
  const result = await api.post("/credit/order", { amount });
  return result.data;
};

export const downloadPdf = async (result) => {
  try {
    const response = await api.post(
      "/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([response.data], {
      type: "application/pdf",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error("PDF Download Failed");
  }
};

export const deleteHistoryApi = async (id) => {
  const result = await api.delete(`/history/delete/${id}`);
  return result.data;
};

// THIS WAS MISSING: Required to fetch the old note when clicking history
export const getSingleNoteApi = async (id) => {
  const result = await api.get(`/notes/${id}`);
  return result.data;
};
export const getTransactionHistoryApi = async () => {
  const result = await api.get("/credit/history");
  return result.data;
};
export default api;
