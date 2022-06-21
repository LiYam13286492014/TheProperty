
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {

    HomeFilled,
    EditOutlined,
    SelectOutlined,
    UserOutlined,
    ApartmentOutlined,
    DeploymentUnitOutlined ,
    DiffOutlined 
} from '@ant-design/icons';

import axios from '../../network/http';

const { Sider } = Layout;

const SiderMenu=(props)=> {

    const list ={
        'HomeFilled':<HomeFilled/>,
        'EditOutlined':<EditOutlined />,
        'SelectOutlined':<SelectOutlined />,
        'UserOutlined':<UserOutlined />,
        'ApartmentOutlined':<ApartmentOutlined />,
        'DeploymentUnitOutlined':<DeploymentUnitOutlined />,
        'DiffOutlined':<DiffOutlined />
    }
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const{roles:{rights}} =JSON.parse(localStorage.getItem('aa'))
    const [itemsData, setItemsData] = useState([])

    const permission =(item)=>{
        return  item.permission===1 && rights.includes(item.key)
    }
    useEffect(() => {
        axios.get('/sider').then((res) => {
            setItemsData(res.data)
            console.log(res.data);
        })
    }, [])
    const items = 

        itemsData.length !== 0  && itemsData.map(item => {
           
            if(permission(item) )   return {
                key: item.key,
                icon:list[item.icon],
                label: item.label
            }
        })


    

    return (
        <Sider trigger={null} collapsible collapsed={props.isTrue}>
            <div className="logo" style={{ textAlign: 'center',fontSize:'16px', color: '#ddd',height:'35px',lineHeight:'35px',letterSpacing:'8px' }}><b>后台数据管理</b></div>
            <Menu
                selectedKeys={pathname}



                theme="dark"
                mode="inline"
                // defaultSelectedKeys={['1']}
                items={items}
                onClick={({ key }) => {
                    navigate(key)
                }

                }
            />
        </Sider>
    )
}

const cc =(state)=>{
    console.log(state.collapsedReducer);
    return state.collapsedReducer
    
}

export default  connect(cc)(SiderMenu)
