import React,{  forwardRef } from 'react'
import {  Form, Input, Select } from 'antd'
const {Option} = Select
 const PushForm=forwardRef((props,ref)=>{
    return (
      <Form layout='vertical' ref={ref}>
      <Form.Item 
          label="商品名称"
          name="title"
          rules={[{ required: true, message: '不能为空' }]}>
          <Select>
              {
                  props.typeShow.map(item=>{
                      return(
                          <Option key={item.id} value={item.value}>{item.title}</Option>
                      )
                  })
              }
          </Select>
      </Form.Item>
  
      <Form.Item 
          label="数量"
          name="count"
          rules={[{ required: true, message: 'Please input your count!' }]}>
          <Input/>
      </Form.Item>
  
      
  
  
  </Form>
    )
  }
  ) 

  export default  PushForm