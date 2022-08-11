import React,{useState} from 'react'
import { Form, Button, Input, message, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


import axios from 'axios';
import store from '.././store/index';
import { isupdateAction } from '../action/isupdate';
import { ChangeInfoApi } from '../network/api';
export default function Change() {
    const [form] = Form.useForm()
    const { id } = JSON.parse(localStorage.getItem('aa'))
    const username = localStorage.getItem('username')

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();




    const onFinish = (values) => {
        // console.log('Success:', values);
        // form.validateFields().then(value => {
        //     console.log(value);
        // })

        if (values.username !== username) {
            axios.patch(`./user/${id}`, {
                username: values.username,
                password: values.password
            }).then(res => {
                console.log(res.data);
                ChangeInfoApi({
                    username: values.username,
                    password: values.password || ''
                }).then(res1 => {
                    console.log(res1.data);
                })

                let tt = JSON.parse(localStorage.getItem('aa'))
                console.log(tt);
                tt.username = res.data.username
                tt.password = res.data.password
                localStorage.setItem('aa', JSON.stringify(tt))
                store.dispatch(isupdateAction())
            })
        } else {
            message.error('用户名重复')
        }

    };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };



    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
      
        const isLt2M = file.size / 1024 / 1024 < 2;
      
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
      
        return isJpgOrPng && isLt2M;

    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };

    const handleChange = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
          }
      
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            // getBase64(info.file.originFileObj, (url) => {
            //   setLoading(false);
            //   setImageUrl(url);
            // });
            if(info.file.response.length!==0){
                message.success('头像上传成功')
                localStorage.setItem('avatar',info.file.response[0].avatar)
                setImageUrl(process.env.SERVER_PORT_IMG +localStorage.getItem('avatar'))
               
                // localStorage.setItem('avatar',info.file.response[0].avatar)
                store.dispatch(isupdateAction())
                
            }
            
            console.log(info.file);
            
          }

    }

    const UploadButton = () => (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    )
    return (
        <div style={{ width: '300px' }}>
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

                /* rules={[{ required: true, message: '不能为空' }]} */

                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" >
                    确定
                </Button>
            </Form>


            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={process.env.SERVER_PORT_IMG + 'manage/upload'}
                headers={{"x_token":localStorage.getItem('x-token')}}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : 
                    <UploadButton/>
                }
            </Upload>

        </div>
    )
}
