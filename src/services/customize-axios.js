import axios from "axios";

const instance = axios.create({
    baseURL: "https://reqres.in"
});

instance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    let response = {};
    if(error.response){
        response.data = error.response.data;
        response.status = error.response.status;
        response.headers = error.response.headers;
    } else if(error.request) {
        console.log(error.request);
    } else {
        console.log("error", error.message);
    }
    return response;
});

export default instance;