
import React,{  forwardRef } from 'react'
import {  Form, Input, Select } from 'antd'

const {Option} = Select

const UserForm =forwardRef((props,ref)=> {
  return (
    <Form layout='vertical' ref={ref}>
    <Form.Item 
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input/>
    </Form.Item>

    <Form.Item 
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input/>
    </Form.Item>

    {/* <Form.Item
        label="区域"
        name="region"
        rules={[{required:true}]}>
        <Select>
           {
               props.regionList.map(item =>{
                   return (
                       <Option  key={item.id} value={item.value}>{item.title}</Option>
                   )
               })
           } 
        </Select>
    </Form.Item> */}

    <Form.Item
        label="角色"
        name="rolesId"
        rules={[{required:true}]}
        >
        <Select>
           {
              props.roleList.map(item =>{
                   return (
                       <Option  key={item.id} value={item.id }>{item.rolename}</Option>
                   )
               })
           } 
        </Select>
    </Form.Item>
</Form>
  )
}
)

export default UserForm
