import { GET_JOBS, APPLY_TO_JOB, APPLIED_JOBS } from '../types/student/jobs'



const initialState = {
    data: [],
    appliedJobs : []
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

        case APPLIED_JOBS:
            console.log("AP", action.payload)
            return Object.assign({}, state, {
                appliedJobs: action.payload
            })

        default: return state
    }
}

export default studentJobs