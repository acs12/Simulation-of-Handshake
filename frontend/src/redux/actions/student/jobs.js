import { GET_JOBS, APPLY_TO_JOB, APPLIED_JOBS } from '../../types/student/jobs'
import axios from 'axios';
import URL from '../../../constants.js';
const jwt_decode = require('jwt-decode')


export function getJobs(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/getAllJobs`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: GET_JOBS,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function applyToJob(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    const formData = new FormData();
        formData.append('myImage',values.resumeUrl);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    console.log("form data",formData)
    const request = axios
        .post(`${URL}/applyToJob`, formData,config);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: APPLY_TO_JOB,
                payload: res.data
            });
            callback(res);
        })
    }

}


export function appliedJobs(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/appliedJobs`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));
            dispatch({
                type: APPLIED_JOBS,
                payload: res.data
            });
            callback(res);
        })
    }

}