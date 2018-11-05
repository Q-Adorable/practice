import React, {Component} from 'react'
import { Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatAction, CHANGEPAGE } from '../../Action'

class SinderLink extends Component {
    render() {
        return (
            <Menu
                className='menu-link'
                mode="inline" 
                defaultOpenKeys={['1']}
                defaultSelectedKeys={['我的日志']}
                onClick={(event) => {
                    this.props.changePage(event.key)
                }}
            >
                <Menu.Item key="我的日志">
                    <Link to='/practise-diaries'>
                        <span>我的日志&nbsp;&nbsp;</span>
                        <Icon type="edit" />
                    </Link>
                </Menu.Item>
                <Menu.Item key="我的关注">
                    <Link to='/followees'>
                        <span>我的关注&nbsp;&nbsp;</span>
                        <Icon type="file-text" />
                    </Link>
                </Menu.Item>
                <Menu.Item key="优秀日志">
                    <Link to='/excellent-diaries'>
                        <span>优秀日志&nbsp;&nbsp;</span>
                        <Icon type="star-o" />
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }
}

const mapPropsToDispatch = state => ({
    selectedPage: state.selection
})
const mapDispatchToState = dispatch => ({
    changePage: (key) => {
        dispatch (formatAction(CHANGEPAGE, key))
    } 
})

export default connect(mapPropsToDispatch, mapDispatchToState)(SinderLink)