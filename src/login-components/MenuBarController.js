import { pageNames, pageNamesPrefixes } from '../pageNames'
import AdminMenuBar from '../admin-components/AdminMenuBar'
import StudentMenuBar from '../student-components/StudentMenuBar';
import ProfessorMenuBar from '../professor-components/ProfessorMenuBar';

const MenuBarController = ({loggedInAccount}) => {
    const profAccType = pageNames[2].substring(pageNamesPrefixes[0].length)
    const studentAccType = pageNames[4].substring(pageNamesPrefixes[0].length)
    const adminAccType = pageNames[0].substring(pageNamesPrefixes[0].length)

    return (
        <div>
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