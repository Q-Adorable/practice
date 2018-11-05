import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reducers from './reducers/Messages'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import './css/App.css'
import 'antd/dist/antd.css'
import './css/contents.css'
import './css/index.css'

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
