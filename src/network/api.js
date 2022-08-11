import request from './request'



 const RegisterApi  = ({username,password}) =>request.post('/register',{
    username,
    password
})


const LoginApi  = ({username,password}) =>request.post('/login',{
    username,
    password
})

const GetInfoApi = ()=>request.get('/info')

const ChangeInfoApi =(params)=> request.post('/info',params)



export {
    RegisterApi,
    LoginApi,
    GetInfoApi,
    ChangeInfoApi
}


