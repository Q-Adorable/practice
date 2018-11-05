import React, { Component } from 'react'
import PractiseDiaries from './contents/PractiseDiaries'
import Followees from './contents/Followees'
import ExcellentDiaries from './contents/ExcellentDiaries'
import { Route , Switch} from 'react-router-dom'

class ContentRouter extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={PractiseDiaries} />
				<Route path="/practise-diaries" component={PractiseDiaries} />
				<Route path="/followees" component={Followees} />
				<Route path="/excellent-diaries" component={ExcellentDiaries} />
			</Switch>
		)
	}
}

export default ContentRouter
