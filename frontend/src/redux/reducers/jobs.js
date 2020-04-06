import { GET_JOBS, APPLY_TO_JOB } from '../types/student/jobs'



const initialState = {
    data: []
}

const studentJobs = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOBS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                data: action.payload
            })

        case APPLY_TO_JOB:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                data: action.payload
            })

        default: return state
    }
}

export default studentJobs