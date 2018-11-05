import React, { Component } from 'react'
import { DatePicker, Input, Button, Card, Form } from 'antd'
import { connect } from 'react-redux'
import DiariesList from './diaries-list'
import { INITEDIT } from '../../Action'
import moment from 'moment'
import { addDiary } from '../../actions/diaries'

const { TextArea } = Input
const FormItem = Form.Item

class AddDiary extends Component{
    constructor(props) {
        super(props)
        let date = new Date()
        this.state = {
            text: INITEDIT,
            date: date.getFullYear() 
            + '-' 
            + ('0' + (date.getMonth() + 1)).slice(-2)
            + '-' 
            + ('0' + date.getDate()).slice(-2)
        }
    }

    handleTextChange = event => {
        const text = event.target.value
        if (text !== null) {
            this.setState({
                text: text
            })
        }
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 20 },
            },
        }

        return (
            <div>
                <Card title="新的日志" extra={<a href="https://www.baidu.com">如何写一篇优秀的成长日志</a>}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="日期"
                        >
                        
                            <DatePicker defaultValue={moment(new Date())} allowClear={false} onChange={(date, dateString) => {
                                this.setState({date:dateString})
                            }}/>
                        
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="总结内容"
                        >
                            <TextArea rows={5} value={this.state.text} onChange={this.handleTextChange} />                        
                        </FormItem>
                        <div className="practise-diary-operation-button-group">
                            <Button type="primary" size="small" ghost className="button-note" onClick={() => {
                                this.props.addText(this.state.text, this.state.date)
                                this.setState({text:INITEDIT})
                            }}>提交</Button>
                            <Button size="small" className='button-note button-distance' onClick={() => {
                                this.setState({text:INITEDIT})
                            }}>取消</Button>
                        </div>
                    </Form>
                </Card>
                <DiariesList />
            </div>
        )
    }
}

const mapPropsToDispatch = () => ({})
const mapDispatchToState = dispatch => ({
    addText: (text, date) => {
        let diary = {
            content : text,
            date : date
        }
        dispatch(addDiary(diary))
    }
})

export default connect(mapPropsToDispatch,mapDispatchToState)(AddDiary)