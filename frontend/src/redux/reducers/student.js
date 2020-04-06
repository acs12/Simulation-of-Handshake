import { STUDENT_SIGNUP } from '../types/student/student'
import {STUDENT_LOGIN} from '../types/student/student'



const initialState = {
    isLoggedIn : null,
    studentId : "",
    schoolName:"",
    education:[],
    experience:[],
    skills:[],
    careerObjective:"",
    email : "",
    phoneNumber:"",
    data : []
}

const studentSignup = (state = initialState, action) => {
    switch(action.type){
        case STUDENT_SIGNUP: return {
            ...state,
            data : action.payload}

        case STUDENT_LOGIN: 
        console.log("AP",action.payload)
        return Object.assign({},state,{
            isLoggedIn : true,
            studentId : action.payload.data._id,
            name : action.payload.data.name,
            email: action.payload.data.email,
            schoolName : action.payload.data.schoolName,
            skills : action.payload.data.skills,
            education : action.payload.data.education,
            experience : action.payload.data.experience,
            data : action.payload
        })
        
        default : return state
    }
}

export default studentSignup