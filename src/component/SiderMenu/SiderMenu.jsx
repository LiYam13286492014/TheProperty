
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';

import {

    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import axios from '../../network/http';

const { Sider } = Layout;

export default function SiderMenu() {
   const navigate= useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const[itemsData,setItemsData] =useState([])
    useEffect(()=>{
        axios.get('/sider').then((res)=>{
            setItemsData(res.data)
            console.log(res.data);
        })
    },[])
    const items = [
                
                    itemsData.length!==0&& itemsData.map(item => {
                        return {
                            key:item.key,
                            
                            label:item.label
                        }
                    })
                
        
    ]
   
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" >111111111111111</div>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={['1']}
                items={items[0]}
                onClick={({key})=>{
                    navigate(key)
                }

                }
            />
        </Sider>
    )
}
