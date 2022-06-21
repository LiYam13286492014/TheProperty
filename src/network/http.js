import axios from "axios";
import store from '../store/index'



axios.defaults.baseURL="http://localhost:3005" //存在会与代理冲突,优先
axios.interceptors.request.use(request =>{
    store.dispatch(
        {
            type:'chang_it',
            payload:true
        }
    )

    return request
},err =>{
    console.log(err);
})


axios.interceptors.response.use(response =>{
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

export default axios