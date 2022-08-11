import axios from "axios";
import store from '../store/index'


const logConfig ={
    baseURL: "/api",
    timeout: 5000
}


const logInstance = axios.create(logConfig)









logInstance.interceptors.request.use(request => {
    store.dispatch(
        {
            type: 'chang_it',
            payload: true
        }
    )
   

    return request
}, err => {
    console.log(err);

})

logInstance.interceptors.response.use(response =>{
    store.dispatch(
        {
            type:'chang_it',
            payload:false
        }
    )
    return response
},err=>{
    console.log(err);
})


export default logInstance
