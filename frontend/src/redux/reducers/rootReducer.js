import { combineReducers} from "redux";
import student from './student';
import jobs from './jobs'
import studentProfile from './studentProfile'
import events from './events'


const rootReducer = combineReducers({
    student: student,
    jobs : jobs,
    events : events,
    studentProfile : studentProfile
})


export default rootReducer;