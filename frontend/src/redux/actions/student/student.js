import { STUDENT_SIGNUP } from '../../types/student/student'
import { STUDENT_LOGIN, ALL_STUDENTS } from '../../types/student/student'
import axios from 'axios';
import URL from '../../../constants.js';

export function studentSignup(values, callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/studentSignup`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: STUDENT_SIGNUP,
                payload: res.data
            });
            
        })
    }

}

export function studentLogin(values, callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/StudentLogin`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: STUDENT_LOGIN,
                payload: res.data
            });
            callback(res)
        })
    }

}


export function allStudents(values, callback) {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    const request = axios
        .get(`${URL}/getStudents`);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: ALL_STUDENTS,
                payload: res.data
            });
            callback(res)
        })
    }

}