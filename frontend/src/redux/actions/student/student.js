import { STUDENT_SIGNUP } from '../../types/student/student'
import {STUDENT_LOGIN} from '../../types/student/student'
import axios from 'axios';
import URL from '../../../constants.js';


export function studentSignup(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/studentSignup`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: STUDENT_SIGNUP,
                payload: res.data
            });
            callback(res);
        })
    }

}

export function studentLogin(values, callback) {
    // console.log(values);

    axios.defaults.withCredentials = true;

    const request = axios
        .post(`${URL}/studentLogin`, values);

    return (dispatch) => {
        request.then((res) => {
            // console.log("In signup user response:" + JSON.stringify(res));

            dispatch({
                type: STUDENT_LOGIN,
                payload: res.data
            });
            callback(res);
        })
    }

}