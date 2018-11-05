import React, { Component } from 'react'
import { Layout } from 'antd'
import {HashRouter as Router} from 'react-router-dom'
import BreadCrumb from './contents/bread-crumb'
import SiderLink from './contents/sinder-link'
import ContentRouter from './content-router'
const { Content, Sider } = Layout

class MyLogPage extends Component {

    render() {
        return (
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
        )
    }
}

export default MyLogPage