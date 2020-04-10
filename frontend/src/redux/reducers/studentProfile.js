import { GET_PROFILE, ADD_EDUCATION, ADD_EXPERIENCE, ADD_SKILL, UPDATE_CONTACT, UPDATE_CAREER, UPDATE_PROFILE, UPDATE_EDUCATION, UPDATE_EXPERIENCE, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_SKILL } from '../types/student/studentProfile'



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
            return Object.assign({}, state, {
                studentId: action.payload._id,
                name: action.payload.name,
                schoolName: action.payload.schoolName,
                address: action.payload.address,
                city: action.payload.city,
                state: action.payload.state,
                country: action.payload.country,
                major: action.payload.major,
                careerObjective: action.payload.careerObjective,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                skills: action.payload.skills,
                education: action.payload.education,
                experience: action.payload.experience,
                data: action.payload
            })

        case UPDATE_CONTACT:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
            })

        case UPDATE_CAREER:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                careerObjective: action.payload.careerObjective
            })



        case ADD_EDUCATION:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                education: action.payload.education,
            })

        case UPDATE_EDUCATION:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                education: action.payload.education,
            })

        case DELETE_EDUCATION:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                education: action.payload.education,
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