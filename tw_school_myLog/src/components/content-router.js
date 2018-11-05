import React, {Component} from 'react'
import { Route , Switch } from 'react-router-dom'
import AddDiary from './contents/add-diary'
import Followees from './contents/followees'
import ExcellentDiaries from './contents/excellent-diaries'


class ContentRouter extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={AddDiary}/>
                <Route exact path='/practise-diaries' component={AddDiary}/>
                <Route exact path='/followees' component={Followees}/>
                <Route exact path='/excellent-diaries' component={ExcellentDiaries}/>
            </Switch>
        )
    }
}

export default ContentRouter