import { useSelector } from "react-redux";
import {  useState} from 'react'
import { FetchAccounts } from "../actions/accountActions";
import TranscriptTemplate from "../page-templates/TranscriptTemplate";

const StudentTranscript = ({loggedInAccount}) => {
    const accs = useSelector(state => state.accounts.items)
    const [userTranscript, setUserTranscript] = useState(null)

    FetchAccounts()

    const getTranscript = () => {
        setUserTranscript(loggedInAccount.transcript)
    }
    
    return (
        <div>
            {accs !== null && accs.length !== 0 && userTranscript === null &&
            getTranscript() }


            {userTranscript !== null && 
            <div>
                 {userTranscript.length !== 0 && <div>
                        <TranscriptTemplate title={"Transcript"}
                            leftFieldTitle={"Course "} rightFieldTitle={"Grade "}
                            entries={userTranscript}></TranscriptTemplate>

                    </div>}
                {userTranscript.length === 0 && <div>
                    <label>No Courses Found..</label>
                    </div>}
                
            </div>} 
        </div>
    )
}

export default StudentTranscript