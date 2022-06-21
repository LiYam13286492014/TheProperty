import { Button, Form, Input, message } from 'antd'
import React from 'react'
import './login.css'
import axios from '../../network/http'
import { useNavigate } from 'react-router-dom'
import ParticlesBg from 'particles-bg'

export default function Login() {
  const navigate =useNavigate()
  const handleCheck =(value)=>{
    axios.get(`/user?username=${value.username}&password=${value.password}&state=true&_expand=roles`).then(res=>{
     console.log(res.data);
      if(res.data.length===0){
        message.error('用户密码错误!')
      }else{
        localStorage.setItem('aa',JSON.stringify(res.data[0]))
        navigate('/',{state:{replace:true}})
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
          <Button style={{width:'100%'}} type='primary' htmlType='submit'><span>Submit</span></Button>
        </Form.Item>
      </Form>
    </div>
   </div>
  )
}
