import { GET_JOBS__BY_ID,POST_JOBS,UPDATE_JOB_STATUS } from '../../types/company/companyJob'
import axios from 'axios';
import URL from '../../../constants.js';

export function getJobsById(values, callback) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/getJobsById`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: GET_JOBS__BY_ID,
                payload: res.data
            });
            callback(res)
            
        })
    }

}

export function postJobs(values, callback) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/addJob`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: POST_JOBS,
                payload: res.data
            });
            callback(res)
        })
    }

}

export function updateJobStatus(values, callback) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .post(`${URL}/jobStatusUpdate`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: UPDATE_JOB_STATUS,
                payload: res.data
            });
            callback(res)
        })
    }

}