import { combineReducers} from "redux";
import student from './student';
import jobs from './jobs'
import studentProfile from './studentProfile'


const rootReducer = combineReducers({
    student: student,
    jobs : jobs,
    studentProfile : studentProfile
})


export default rootReducer;