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
        <div>
            {/*logged in is a 0 or 1, 0 representing logged out, 1 representing logged in*/}
            <Header onAccountRecieved={onAccountRecieved} currentUserAccount={loggedInAccount} 
            loggedIn={1}></Header>
            

            {loggedInAccount.accountType === adminAccType &&
                <AdminMenuBar loggedInAccount={loggedInAccount}></AdminMenuBar>
            }

            {loggedInAccount.accountType === studentAccType &&
                <StudentMenuBar loggedInAccount={loggedInAccount}></StudentMenuBar>
            }

            {loggedInAccount.accountType === profAccType &&
                <ProfessorMenuBar loggedInAccount={loggedInAccount}></ProfessorMenuBar>
            }


        </div>
    )

}

export default MenuBarController