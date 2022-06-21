

import 'antd/dist/antd.css';
import './App.css';
import React, { useEffect, useState } from 'react';

import { Layout, Spin } from 'antd';

import HeadMenu from './component/Head/HeadMenu';
import SiderMenu from './component/SiderMenu/SiderMenu';
import { Route, useRoutes, Routes, Navigate, useLocation } from 'react-router-dom';
import list from './routes/index'
import Login from './views/login/login';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import { connect } from 'react-redux';

const { Content } = Layout;


function App(props) {
  const routes = list()

  const element = useRoutes(routes)

  // useEffect(()=>{
  //   console.log(routes);
  // },[])
  NProgress.start()
  useEffect(() => { NProgress.done() })
  return (

    <div className="App">
      <Routes>
      <Route path='/login' element={<Login />} ></Route>
        <Route path='/*' element={!localStorage.getItem('aa') ? <Navigate to='/login' /> :
          <Spin spinning={props.isLoading}>
            <Layout className='aa'>
              <SiderMenu />
              <Layout className="site-layout">
                <HeadMenu />
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
            </Layout>
          </Spin>

        }>

        </Route>
       

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

const mapStateToProps=({loadingReducer})=>{
   return loadingReducer
}



export default connect(mapStateToProps)(App);
