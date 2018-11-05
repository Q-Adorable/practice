import React,{ Component } from 'react'
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'

class BreadCrumb extends Component {
    render() {
        return (
            <Breadcrumb className='bread-crumb'>
                <Breadcrumb.Item>思沃学院</Breadcrumb.Item>
                <Breadcrumb.Item>成长日志</Breadcrumb.Item>
                <Breadcrumb.Item>{this.props.selectedPage}</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

const mapPropsToDispatch = state => ({
    selectedPage: state.selection
})
const mapDispatchToState = () => ({})

export default connect(mapPropsToDispatch, mapDispatchToState)(BreadCrumb)