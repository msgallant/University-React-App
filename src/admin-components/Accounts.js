import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { accountActionCreators } from "../actions";
import { useEffect } from 'react'
import BorderedList from "../page-templates/BorderedList";
import '@fortawesome/fontawesome-free/js/all.js';

const Accounts = ({ accTypes }) => {
    const dispatch = useDispatch()
    const { fetchAccounts, deleteAccount } = bindActionCreators(accountActionCreators, dispatch)

    useEffect(() => {
        fetchAccounts()
    }, [])

    const accType = accTypes.substring(0, (accTypes.length-1)) //get rid of the s
    const accounts = useSelector(state => state.accounts.items.filter(account => 
        (account.accountType === accType)))

    const accountItems = accounts.map(account => (
        <div key={account.id} className="select-div-color">
            <label>
                name: {account.firstName} {account.middleName} {account.lastName}
                &nbsp; email: {account.email} &nbsp;
            </label>
            
            <label onClick={() => deleteAccount(account.id)}>
                <i className="fas fa-trash-alt delete-icon-color"></i>
            </label>
            
            
        </div>
        ))    
    
    return (
        
        <BorderedList itemListTitleName={accTypes} listItems={accountItems}></BorderedList>
    )
    }


export default Accounts