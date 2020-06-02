import { COMPANY_SEND_MSG,MESSAGE_FROM_COMPANY } from '../../types/message/companyMessage'
import axios from 'axios';
import URL from '../../../constants.js';

export function companySendsMessage(values, callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/CompanyMessagePost`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: COMPANY_SEND_MSG,
                payload: res.data
            });
            callback(res)
            
        })
    }

}

export function messageFromCompany(values, callback) {
    axios.defaults.withCredentials = true;
    const request = axios
        .post(`${URL}/MessageFromCompany`, values);

    return (dispatch) => {
        request.then((res) => {
            dispatch({
                type: MESSAGE_FROM_COMPANY,
                payload: res.data
            });
            callback(res)
            
        })
    }

}