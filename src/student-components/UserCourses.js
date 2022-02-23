import SemesterCourses from "../admin-components/SemesterCourses"
import { accountActionCreators } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect} from 'react'

const UserCourses = ({onComplete, onSelect, canAssignGrades, canUnregister, loggedInAccount}) => {
    const dispatch = useDispatch()
    const { fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)
    const accs = useSelector(state => state.accounts.items)

    useEffect(() => {
        fetchAccounts()
    }, [])

    const setAccounts = (accounts) => {
        accs = accounts
    }

    return (
        <div>

            {accs != null && accs.length !== 0 &&
            <SemesterCourses canRegister={false} 
            loggedInAccount={loggedInAccount}
            canUnregister={canUnregister} 
            onComplete={onComplete}
            selectedCourses={loggedInAccount.coursesRegisteredIn}
            onSelect={onSelect}
            canAssignGrades={canAssignGrades}
             ></SemesterCourses>}
        </div>
    )

}

export default UserCourses