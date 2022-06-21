import React from 'react'
import { Form, Button, Input, message } from 'antd'
import axios from 'axios';
export default function Change() {
    const [form] = Form.useForm()

    const{id,username} = JSON.parse(localStorage.getItem('aa'))
    
    const onFinish = (values) => {
        // console.log('Success:', values);
        // form.validateFields().then(value => {
        //     console.log(value);
        // })
        if(values.username!==username){
            axios.patch(`./user/${id}`,{
                username:values.username,
                password:values.password
            })
        }else{
            message.error('用户名重复')
        }

    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    return (
        <div style={{width:'300px'}}>
            <Form
                form={form}

                onFinish={onFinish}

            >
                <Form.Item
                    label="修改用户名"
                    name="username"

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="修改密码"
                    name="password"
                    rules={[{ required: true, message: '不能为空' }]}

                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    确定
                </Button>

            </Form>

        </div>
    )
}
