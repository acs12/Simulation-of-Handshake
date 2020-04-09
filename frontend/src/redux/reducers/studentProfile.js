import { GET_PROFILE, ADD_EDUCATION, ADD_EXPERIENCE, ADD_SKILL, UPDATE_CAREER, UPDATE_PROFILE, UPDATE_EDUCATION, UPDATE_EXPERIENCE, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_SKILL } from '../types/student/studentProfile'



const initialState = {
    studentId: "",
    name: "",
    schoolName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    major: "",
    education: [],
    experience: [],
    skills: [],
    careerObjective: "",
    email: "",
    phoneNumber: "",
    data: []
}

const studentProfile = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            console.log("AP", action.payload)
            return {
                ...state,
                studentId: action.payload.data._id,
                name: action.payload.data.name,
                schoolName: action.payload.data.schoolName,
                address: action.payload.data.address,
                city: action.payload.data.city,
                state: action.payload.data.state,
                country: action.payload.data.country,
                major: action.payload.data.major,
                email: action.payload.data.email,
                phoneNumber: action.payload.data.phoneNumber,
                skills: action.payload.data.skills,
                education: action.payload.data.education,
                experience: action.payload.data.experience,
                data: action.payload
            }

        case ADD_EDUCATION:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                education: action.payload.data.education,
                data: action.payload
            })

        case ADD_EXPERIENCE:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                experience: action.payload.data.experience,
                data: action.payload
            })

        case ADD_SKILL:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                skills: action.payload.data.skills,
                data: action.payload
            })

        default: return state
    }
}

export default studentProfile