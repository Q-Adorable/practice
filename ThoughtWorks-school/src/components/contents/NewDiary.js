import React, { Component } from 'react'
import { Card, Form, DatePicker, Input, Button, Row, Col } from 'antd'

const { TextArea } = Input

const formItemLayout = {
	labelCol: {
		xs: { span: 8 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 16 },
		sm: { span: 20 },
	},
}

class NewDiary extends Component {
	constructor(props) {
		super(props)
		this.contentHandle = this.contentHandle.bind(this)
		this.dateHandle = this.dateHandle.bind(this)
		this.state = {
			content: '## 我做了什么 ## 学了什么 ## 有什么印象深刻的收获',
			date: ''
		}
	}

	contentHandle(e) {
		this.setState({ content: e.target.value })
	}

	dateHandle(date, dateString) {
		this.setState({ date: dateString })
	}

	render() {
		const addDiaryHandle = this.props
		return (
			<Card title="新的日志"
				extra={<a href="https://school.thoughtworks.cn/bbs/topic/1230/%E5%A6%82%E4%BD%95%E5%86%99%E4%B8%80%E7%AF%87%E4%BC%98%E7%A7%80%E7%9A%84%E6%88%90%E9%95%BF%E6%97%A5%E5%BF%97"
					rel="noopener noreferrer"
					target="_blank">
					如何写一篇优秀的成长日志
				</a>} >
				<Form>
					<Form.Item {...formItemLayout} label="日期">
						<DatePicker format={'YYYY/MM/DD'}
							onChange={this.dateHandle} />
					</Form.Item>
					<Form.Item {...formItemLayout} label="总结内容">
						<TextArea rows={5}
							size="large"
							className="ant-input"
							value={this.state.content}
							onChange={this.contentHandle}>
						</TextArea>
					</Form.Item>
					<Row gutter={24} type="flex" justify="end">
						<Col >
							<Button type="primary" ghost
								onClick={() => addDiaryHandle(this.state.date, this.state.content)}>
								提交
							</Button>
						</Col>
						<Col>
							<Button>取消</Button>
						</Col>
					</Row>
				</Form>
			</Card >
		)
	}
}

export default NewDiary