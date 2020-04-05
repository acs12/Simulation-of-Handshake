import { STUDENT_SIGNUP } from '../types/student/student'
import {STUDENT_LOGIN} from '../types/student/student'


const initialState = {
    auth : "",
    studentId : "",
    name : "",
    email : "",
    schoolName: "",
    data : []
}

const studentSignup = (state = initialState, action) => {
    switch(action.type){
        case STUDENT_SIGNUP: return {
            ...state,
            data : action.payload}

        case STUDENT_LOGIN: return {
            ...state,
            data : action.payload}
        
        default : return state
    }
}

export default studentSignup