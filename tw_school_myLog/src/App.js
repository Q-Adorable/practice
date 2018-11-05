import React, { Component } from 'react'
import { Layout } from 'antd'
import PageHeader from './components/page-header'
import PageFooter from './components/page-footer'
import {HashRouter as Router} from 'react-router-dom'
import BreadCrumb from './components/contents/bread-crumb'
import SiderLink from './components/contents/sinder-link'
import ContentRouter from './components/content-router'
const { Content, Sider ,Header , Footer} = Layout


class App extends Component {
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Header className="header">
                    <PageHeader />
                </Header>
                <Content className='page-content'>
                    <BreadCrumb />
                    <Router>
                        <Layout  className='content'>
                            <Sider>
                                <SiderLink />
                            </Sider>
                            <Content className='content-router'>
                                <ContentRouter/>
                            </Content>
                        </Layout>
                    </Router>
                </Content>
                <Footer className='text-position'>
                    <PageFooter />
                </Footer>
            </Layout>
        )
    }
}

export default App