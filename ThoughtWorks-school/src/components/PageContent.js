import React from 'react'
import { Layout } from 'antd'
import { HashRouter as Router } from 'react-router-dom'
import SiderLink from './SiderLink'
import ContentRouter from './ContentRouter'
import PageBreadcrumb from './PageBreadcrumb'

const { Content, Sider } = Layout

const PageContent = () => {
	return (
		<Content style={{ padding: '0 50px', background: '#ececec' }}>
			<PageBreadcrumb />
			<Router>
				<Layout style={{ padding: '24px 0', background: '#fff' }}>
					<Sider width={200} style={{ background: '#fff' }}>
						<SiderLink />
					</Sider>
					<Content style={{ padding: '0 24px', minHeight: 280, background: '#fff' }}>
						<ContentRouter />
					</Content>
				</Layout>
			</Router>
		</Content>)
}

export default PageContent