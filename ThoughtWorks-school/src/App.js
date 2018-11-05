import React, { Component } from 'react'
import { Layout } from 'antd'
import PageHeader from './components/PageHeader'
import PageContent from './components/PageContent'
import PageFooter from './components/PageFooter'
import './App.css'
import './index.css'

class App extends Component {
	render() {
		return (
			<Layout>
				<PageHeader />
				<PageContent />
				<PageFooter />
			</Layout>
		)
	}
}

export default App
