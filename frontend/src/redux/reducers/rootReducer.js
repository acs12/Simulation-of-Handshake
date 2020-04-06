import { combineReducers} from "redux";
import student from './student';
import jobs from './jobs'


const rootReducer = combineReducers({
    student: student,
    jobs : jobs
})


export default rootReducer;