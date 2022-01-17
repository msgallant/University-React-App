import { accountActionCreators } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect,  useState} from 'react'
import { getUserLoggedIn } from "../userStorage";

const StudentTranscript = ({}) => {
    const dispatch = useDispatch()
    const { fetchAccounts } = bindActionCreators(accountActionCreators, dispatch)
    const accs = useSelector(state => state.accounts.items)
    const [userTranscript, setUserTranscript] = useState(null)
    const [loadTranscript, setLoadTranscript] = useState(false)

    useEffect(() => {
        fetchAccounts()
    }, [])

    const getTranscript = () => {
        const user = getUserLoggedIn(accs)
        setUserTranscript(user.transcript)
    }

    const makeEntries= (entries) => {
        return (
            <div>
            {entries.map((entry, index)=>  { return (
            <div key={index} className="select-div-color">

                <label>
                    {entry.name}  {entry.grade != null ? entry.grade : 'n/a'}
                </label>              
            </div>
        )})}
        </div>
        )
    }
    

    return (
        <div>
            {accs != null && accs.length !== 0 && userTranscript == null &&
            getTranscript() }

            <div>
                <label> Course: </label>
                <label> Grade: </label>
            </div>

            {userTranscript != null && userTranscript !== 0 && 
            <div>
                {makeEntries(userTranscript)}
            </div>} 
        </div>
    )
}

export default StudentTranscript