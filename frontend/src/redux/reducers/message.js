import { COMPANY_SEND_MSG } from '../types/message/companyMessage'



const initialState = {
    data: []
}

const messages = (state = initialState, action) => {
    switch (action.type) {
        case COMPANY_SEND_MSG:
            console.log("AP", action.payload)
            return {
                ...state,
                data: action.payload
            }

        default: return state
    }
}

export default messages