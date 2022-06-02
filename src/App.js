

import 'antd/dist/antd.css';
import './App.css';
import React, { useState } from 'react';

import { Layout } from 'antd';

import HeadMenu from './component/Head/HeadMenu';
import SiderMenu from './component/SiderMenu/SiderMenu';
import { Route, useRoutes,Routes, Navigate } from 'react-router-dom';
import  routes from './routes/index'
import Login from './views/login/login';

const {  Content } = Layout;

function App() {
  const element = useRoutes(routes)
 
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/*' element={localStorage.getItem('aa')?<Layout className='aa'>
      <SiderMenu/>
        <Layout className="site-layout">
          <HeadMenu/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {element}
          </Content>
        </Layout>
      </Layout>:<Navigate to='/login'/>     }></Route>
        
      </Routes>
    


      
      
      {/* <Layout className='aa'>
      <SiderMenu/>
        <Layout className="site-layout">
          <HeadMenu/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {element}
          </Content>
        </Layout>
      </Layout> */}
    </div>
  );
}

export default App;
