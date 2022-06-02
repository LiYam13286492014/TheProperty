import axios from "axios";


axios.defaults.baseURL="http://localhost:3005"
axios.interceptors.request.use(request =>{

    return request
},err =>{
    console.log(err);
})


axios.interceptors.response.use(response =>{

    return response
},err=>{
    console.log(err);
})

export default axios