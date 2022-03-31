import { pageNames, pageNamesPrefixes } from '../pageNames'
import AdminMenuBar from '../admin-components/AdminMenuBar'
import StudentMenuBar from '../student-components/StudentMenuBar';
import ProfessorMenuBar from '../professor-components/ProfessorMenuBar';
import Header from '../header-components/Header';

const MenuBarController = ({loggedInAccount, onAccountRecieved, setUserAccount}) => {
    const profAccType = pageNames[2].substring(pageNamesPrefixes[0].length)
    const studentAccType = pageNames[4].substring(pageNamesPrefixes[0].length)
    const adminAccType = pageNames[0].substring(pageNamesPrefixes[0].length)

    return (
        <div className='full-height'>
            {/*logged in is a 0 or 1, 0 representing logged out, 1 representing logged in*/}
            <Header onAccountRecieved={onAccountRecieved} currentUserAccount={loggedInAccount} 
            loggedIn={1}></Header>
            
            <div className='full-height'>

            
                {loggedInAccount.accountType === adminAccType &&
                    <div className='full-height'>
                        <AdminMenuBar className='full-height' loggedInAccount={loggedInAccount}></AdminMenuBar>

                    </div>
                }

                {loggedInAccount.accountType === studentAccType &&
                    <div className='full-height'>
                        <StudentMenuBar className='full-height' loggedInAccount={loggedInAccount}></StudentMenuBar>

                    </div>
                }

                {loggedInAccount.accountType === profAccType &&
                    <div className='full-height'>
                        <ProfessorMenuBar className='full-height' loggedInAccount={loggedInAccount}></ProfessorMenuBar>

                    </div>
                }

            </div>


        </div>
    )

}

export default MenuBarController