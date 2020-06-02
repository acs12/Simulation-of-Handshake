import { GET_EVENTS__BY_ID,POST_EVENT } from '../../types/company/companyEvent'
import axios from 'axios';
import URL from '../../../constants.js';

export function getEventsById(values, callback) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/getEventsById`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: GET_EVENTS__BY_ID,
                payload: res.data
            });
            callback(res)
            
        })
    }

}

export function postEvents(values, callback) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/addEvent`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: POST_EVENT,
                payload: res.data
            });
            callback(res)
        })
    }

}