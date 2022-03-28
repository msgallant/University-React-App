import { useSelector } from "react-redux";
import {  useState} from 'react'
import { FetchAccounts } from "../actions/accountActions";

const StudentTranscript = ({loggedInAccount}) => {
    const accs = useSelector(state => state.accounts.items)
    const [userTranscript, setUserTranscript] = useState(null)

    FetchAccounts()

    const getTranscript = () => {
        setUserTranscript(loggedInAccount.transcript)
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
            {accs !== null && accs.length !== 0 && userTranscript === null &&
            getTranscript() }

            <div>
                <label> Course: </label>
                <label> Grade: </label>
                
            </div>

            {userTranscript !== null && userTranscript.length !== 0 && 
            <div>
                {makeEntries(userTranscript)}
            </div>} 
        </div>
    )
}

export default StudentTranscript