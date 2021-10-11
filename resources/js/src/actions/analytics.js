const axios = window.axios;
import { setAlert } from "./alert";

export const getAnalytics = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/analytics");

        const res1 = await axios.get("/api/analytics/analysis");

        console.log(res.data);
        console.log(res1.data);
    } catch (err) {
        console.log(err.response);
    }
};
