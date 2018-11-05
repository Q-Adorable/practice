import { connect } from 'react-redux'
import React from 'react'
import NewDiary from './NewDiary'

const PractiseDiaries = ({ addDiaryHandle } = this.props) => {
	return (
		<div>
			<NewDiary addDiaryHandle={addDiaryHandle} />
		</div>
	)
}

const mapStateToProps = () => { }

const mapDispatchToProps = (dispatch) => ({
	addDiaryHandle: (date, content) => {
		dispatch(
			{
				type: 'ADD_DIARY',
				data: {
					date: date,
					content: content
				}
			}
		)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(PractiseDiaries)
