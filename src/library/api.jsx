import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://emm-core-global-networks-updated.vercel.app/api/v1",
    headers: {
        Authorization: token?`Bearer ${token}`:"",
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
})