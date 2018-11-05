import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const SiderLink = () => {
	return (
		<Menu mode="inline"
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1']}
			style={{ height: '100%' }} >
			<Menu.Item key="1">
				<Link to="/practise-diaries">我的日志&nbsp;&nbsp;&nbsp;<Icon type="edit" /></Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/followees">我的关注&nbsp;&nbsp;&nbsp;<Icon type="file-text" /></Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to="/excellent-diaries">优秀日志&nbsp;&nbsp;&nbsp;<Icon type="star-o" /></Link>
			</Menu.Item>
		</Menu>
	)
}

export default SiderLink