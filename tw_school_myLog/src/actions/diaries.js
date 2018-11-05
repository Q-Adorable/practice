import request from 'superagent'
import { formatAction, GETDIARIES, FIXTEXT, DESTORYLOG } from '../Action'

export const loadDiaries = () => {
    return dispatch => {
        request.get('/diaries').end((err, res) => {
            dispatch(formatAction(GETDIARIES, res.body))
        })
    }
}

export const loadDiariesByPage = (page, pageSize) => {
    return dispatch => {
        request.get('/diaries')
            .query({page:page - 1})
            .query({pageSize:pageSize})
            .end((err, res) => {
                dispatch(formatAction(GETDIARIES, res.body))
            })
    }
}

export const reEditDiary = (id, diary, data) => {
    return dispatch => {
        request.put(`/diaries/${id}`)
            .set('Content-Type', 'application/json')
            .send(diary).end((err, res) => {
                if(res.statusCode === 204){
                    dispatch(formatAction(FIXTEXT, data))
                    dispatch(loadDiaries())
                }
            })
    }
}

export const addDiary = (diary) => {
    return dispatch => {
        request.post('/diaries')
            .set('Content-Type', 'application/json')
            .send(diary).end((err, res) => {
                if(res.statusCode === 201){
                    dispatch(loadDiaries())
                }
            })
    }
}

export const deleteDiary = (id, index) => {
    return dispatch => {
        request.delete(`/diaries/${id}`).end((err, res) => {
            if(res.statusCode === 204){
                dispatch(formatAction(DESTORYLOG, index))
                dispatch(loadDiaries())
            }
        })
    }
}