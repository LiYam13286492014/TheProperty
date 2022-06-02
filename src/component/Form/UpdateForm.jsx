import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input} from 'antd';

const UpdateForm=forwardRef((props,refs)=> {

    const[valueData,setValueData] =useState()
    const [form] = Form.useForm();
   

  

    return (

        <Form layout='vertical' form={form} ref={refs}>
            <Form.Item
                label="使用人"
                name="user_name"
                rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="座位"
                name="sit"
                rules={[{ required: true, message: 'Please input the sit!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="物品名称"
                name="show_name"
                rules={[{ required: true, message: 'Please input the show_name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="时间"
                name="create_time"
                rules={[{ required: true }]}>
                <Input  />
            </Form.Item>

            <Form.Item
                label="数量"
                name="count"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
})


export default  UpdateForm
