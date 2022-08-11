import axios from "axios";
import store from '../store/index'

//配置项
const baseConfig = {
    baseURL: "http://localhost:9000/manage",
    timeout: 5000
}


const instance = axios.create(baseConfig)


instance.interceptors.request.use(request => {
    store.dispatch(
        {
            type: 'chang_it',
            payload: true
        }
    )
    let token =  localStorage.getItem('x-token')
    if(token){
        request.headers = {
            "x_token": token
        }
    }

    return request
}, err => {
    console.log(err);

})

instance.interceptors.response.use(response =>{
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




export  default instance