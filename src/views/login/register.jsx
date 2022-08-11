import { Button, Form, Input, message } from 'antd'
import React from 'react'
import './login.css'
// import axios from '../../network/http'
import {RegisterApi} from '../../network/api'
import { useNavigate } from 'react-router-dom'
import ParticlesBg from 'particles-bg'

export default function Register() {
  const navigate =useNavigate()
  const handleCheck =(value)=>{
    let{username,password,password1} = value
    if(password !== password1){
        message.error('输入的密码不一致')
    }else{
        RegisterApi({username,password}).then(res=>{
            console.log(res.data);
             if(res.data.errCode ===0){
               message.error('用户已注册')
             }else{
               message.success('注册成功，正在跳转至登陆界面')
              
               setTimeout(()=>{
                navigate('/login')
               },1500)
             }
           })
    }




  }
  return (
   <div className='login'>
     <ParticlesBg type="random" bg={true}/>
      <div className='loginContain'>
      <div><b>管理系统-注册</b></div>

      <Form onFinish={handleCheck}>
        <Form.Item
        
          name='username'
          rules={[{required: true, message: "please input your name" }]}
        >
           <Input placeholder='Username'/> 

        </Form.Item>

        <Form.Item
        
          name='password'
          rules={[{ required: true, message: "please input your password" }]}>
          <Input placeholder='Password'/>

        </Form.Item>

        <Form.Item
        
        name='password1'
        rules={[{ required: true, message: "confirm!" }]}>
        <Input placeholder='confirmPassword'/>

      </Form.Item>

        <Form.Item>
          <Button style={{width:'100%'}} type='primary' htmlType='submit'><span>注册</span></Button>
        </Form.Item>
      </Form>
    </div>
   </div>
  )
}
