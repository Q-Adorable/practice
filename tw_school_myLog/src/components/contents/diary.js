import React, { Component } from 'react'
import { Button, Card, Form ,Icon, Popconfirm, message} from 'antd'
import Markdown from 'react-markdown'
import { connect } from 'react-redux'
import { formatAction, CHANGEDIARY, DISPLAY, HIDE } from '../../Action'
import DiaryEditForm from './diary-edit-form'
import { deleteDiary } from '../../actions/diaries'


class Diary extends Component {

    handleDelete = (id, index) => {
        this.props.destoryText(id, index)
        message.success('删除成功')
    }

    render() {
        return (
            <div key={this.props.index} className="card-item">
                <Card title={this.props.diary.date + '的日志'} className={this.props.diary.changeDiary}
                    extra={<Popconfirm title="确认删除吗?" onConfirm={() => {this.handleDelete(this.props.diary.id, this.props.index)}} okText="确认" cancelText="取消">
                        <Icon type="close" />
                    </Popconfirm>}>
                    <Form>
                        <Markdown source={this.props.diary.content} className="markdown"/>
                        <div className="practise-diary-operation-button-group">
                            <Button type="primary" size="small" ghost className="button-note" onClick={() => {this.props.changeDiary(this.props.index)}}>修改日志</Button>
                            <Button type="primary" size="small" ghost className="button-note button-distance">评论日志</Button>
                        </div>
                    </Form>
                </Card>
                <Card className={this.props.diary.changeDiary === DISPLAY ? HIDE : DISPLAY}
                    title="修改成长日志">
                    <DiaryEditForm diary={this.props.diary} index={this.props.index}/>
                </Card>
            </div>
        )
    }
}
const mapPropsToDispatch = () => ({})
const mapDispatchToState = (dispatch) => ({
    destoryText: (id, index) => {
        dispatch(deleteDiary(id, index))
    },

    changeDiary: (index) => {
        dispatch(formatAction(CHANGEDIARY, index))
    }
})

export default connect(mapPropsToDispatch,mapDispatchToState)(Diary)