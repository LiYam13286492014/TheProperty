
import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Image, Upload } from 'antd';
import store from '../../store/index';
import { connect } from 'react-redux';
import { istrueAction } from '../../action/istrueAciton';
import './HeadMenu.css'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined

} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout
const HeadMenu=(props)=> {

    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const { username } = JSON.parse(localStorage.getItem('aa'))


    const Toleft = (e) => {
        if (e.key === '1') {
            localStorage.removeItem('aa')
            navigate('/login', { state: { replace: true } })
        }

    }
    const menu = (
        <Menu
            onClick={Toleft}
            items={
                [
                    {
                        key: "1",
                        label: (
                            <span >退出</span>
                        ),

                    }
                ]
            }>

        </Menu>
    )

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
            }}
        >
            {React.createElement(props.isTrue ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => {
                    store.dispatch(istrueAction())
                },
            })}

            <div style={{ float: 'right', marginRight: '16px' }}>

                <div >


                    <Avatar style={{marginRight:'2px'}} onClick={() => console.log(1)} src={<Image preview={false} src="https://img2.baidu.com/it/u=1003141941,2906255729&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=725" style={{ width: 32 }} />} />

                    <span>
                        欢迎<span style={{ fontSize: '16px', color: "burlywood" }}>{username}</span>回来
                    </span>


                    <Dropdown overlay={menu}>


                        <DownOutlined />

                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

const dd =(state)=>{
    return state.collapsedReducer
}
 export default connect(dd)(HeadMenu)
