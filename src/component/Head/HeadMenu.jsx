
import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import './HeadMenu.css'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined

} from '@ant-design/icons';
const { Header } = Layout
export default function HeadMenu() {
    const [collapsed, setCollapsed] = useState(false);
    const menu = (
        <Menu>
            <Menu.Item>退出</Menu.Item>
        </Menu>
    )

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
            }}
        >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}

            <div style={{ float: 'right', marginRight: '16px' }}>
                <span>
                    欢迎xxxx回来
                </span>
                <Dropdown overlay={menu}>
                  
                            
                            <DownOutlined />
                
                </Dropdown>
            </div>
        </Header>
    )
}
