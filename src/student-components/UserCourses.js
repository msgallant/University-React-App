import { getUserLoggedIn } from "../userStorage"
import SemesterCourses from "../admin-components/SemesterCourses"
import { accountActionCreators } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect} from 'react'

const UserCourses = ({onComplete}) => {
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

            {console.log("testing user courses")}
            {console.log(getUserLoggedIn(accs))}


            {accs != null && accs.length !== 0 &&
            <SemesterCourses canRegister={false} onComplete={onComplete}
            selectedCourses={getUserLoggedIn(accs).coursesRegisteredIn}></SemesterCourses>}
        </div>
    )

}

export default UserCourses