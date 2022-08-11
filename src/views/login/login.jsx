import { Button, Form, Input, message } from 'antd'
import React from 'react'
import './login.css'
import axios from '../../network/http'
import { useNavigate } from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import {LoginApi} from '../../network/api'

export default function Login() {
  const navigate =useNavigate()
    const handleToRegister =()=>{
    navigate('/register')
  }   //数据库相关
  const handleCheck =async (value)=>{

    axios.get(`/user?username=${value.username}&password=${value.password}&state=true&_expand=roles`).then(res=>{
     console.log(res.data);
     
      if(res.data.length===0){
        message.error('用户密码错误!')
      }else{
        localStorage.setItem('aa',JSON.stringify(res.data[0]))
        let {username,password} =  value

       LoginApi({username,password}).then(res1=>{

          localStorage.setItem('x-token',res1.data.data[0].token)
          localStorage.setItem('avatar',res1.data.data[0].avatar)

        })
        
        // localStorage.setItem('username',JSON.stringify(res.data[0].username))
        // localStorage.setItem('password',JSON.stringify(res.data[0].password))
        message.success('登陆中...')
        setTimeout(() => {
          navigate('/',{state:{replace:true}})
        }, 1500);
      }
    })

  }
  return (
   <div className='login'>
     <ParticlesBg type="random" bg={true}/>
      <div className='loginContain'>
      <div><b>管理系统</b></div>

      <Form onFinish={handleCheck}>
        <Form.Item
        
          name='username'
          rules={[{required: true, message: "please input your name" }]}
        >
           <Input placeholder='username'/> 

        </Form.Item>

        <Form.Item
        
          name='password'
          rules={[{ required: true, message: "please input your password" }]}>
          <Input placeholder='password'/>

        </Form.Item>

        <Form.Item>
          <Button style={{width:'100%'}} type='primary' htmlType='submit'><span>登陆</span></Button>
          <Button style={{width:'100%'}} type='dash'onClick={handleToRegister} ><span>前往注册</span></Button>
        </Form.Item>
      </Form>
    </div>
   </div>
  )
}


// export default function Login() {
//   const navigate =useNavigate()
//   const handleToRegister =()=>{
//     navigate('/register')
//   }
//   const handleCheck =(value)=>{
//     let {username,password} = value
//     LoginApi({username,password}).then(res=>{
//      console.log(res.data);
//       if(res.data.errCode===1){
//         message.error('用户密码不匹配!')
//       }else{
//         console.log(res.data);
//         // localStorage.setItem('aa',JSON.stringify(res.data[0]))
//         // navigate('/',{state:{replace:true}})
//       }
//     })

//   }
//   return (
//    <div className='login'>
//      <ParticlesBg type="random" bg={true}/>
//       <div className='loginContain'>
//       <div><b>管理系统</b></div>

//       <Form onFinish={handleCheck}>
//         <Form.Item
        
//           name='username'
//           rules={[{required: true, message: "please input your name" }]}
//         >
//            <Input placeholder='username'/> 

//         </Form.Item>

//         <Form.Item
        
//           name='password'
//           rules={[{ required: true, message: "please input your password" }]}>
//           <Input placeholder='password'/>

//         </Form.Item>

//         <Form.Item>
//         <Button style={{width:'100%'}} type='dash'onClick={handleToRegister} ><span>前往注册</span></Button>
//           <Button style={{width:'100%'}} type='primary' htmlType='submit'><span>登陆</span></Button>
//         </Form.Item>
//       </Form>
//     </div>
//    </div>
//   )
// }

