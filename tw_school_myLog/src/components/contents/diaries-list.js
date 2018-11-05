import React, { Component } from 'react'
import { Layout, Pagination } from 'antd'
import { connect } from 'react-redux'
import Diary from './diary'
import {loadDiariesByPage, loadDiaries} from '../../actions/diaries'
import { DISPLAY, HIDE } from '../../Action'


const { Content } = Layout
class DiariesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1
        }
    }

    componentWillMount(){
        let { handleDiaries } = this.props
        handleDiaries()
    }

    render() {
        return (
            <Content>
                {this.props.diaries.map((diary, index) => {
                    return <Diary key={index} diary={diary} index={index}/>
                })}
                <Pagination current={this.state.current} 
                    total={this.props.totalDiaries} 
                    className={this.props.totalDiaries === 0 ? HIDE : DISPLAY}
                    pageSize={2}
                    onChange={(page, pageSize) => {
                        this.setState({
                            current:page
                        })
                        this.props.handleReloadDiaries(page, pageSize)}
                    }/>
                
            </Content>
        )
    }
}

const mapPropsToDispatch = state => ({
    diaries: state.diaries,
    totalDiaries: state.totalDiaries
})
const mapDispatchToState = (dispatch) => ({
    handleDiaries: () => {
        dispatch(loadDiaries())
    },
    
    handleReloadDiaries: (page, pageSize) => {
        dispatch(loadDiariesByPage(page, pageSize))
    }
})

export default connect(mapPropsToDispatch,mapDispatchToState)(DiariesList)