import { useSelector } from "react-redux";
import React, { useState } from "react";
import BorderedList from "../page-templates/BorderedList";
import '@fortawesome/fontawesome-free/js/all.js';
import { FetchAccounts, DeleteAccount } from "../actions/accountActions";
import SubmitAction from "../action-submitter/SubmitAction";

const Accounts = ({ accTypes }) => {

    FetchAccounts()
    const [deleteObjID, setDeleteObjID] = useState(null)

    const accType = accTypes.substring(0, (accTypes.length-1)) //get rid of the s
    const accounts = useSelector(state => state.accounts.items.filter(account => 
        (account.accountType === accType)))

    const accountItems = accounts.map(account => (
        <div key={account.id} className="select-div-color">
            <label>
                name: {account.firstName} {account.middleName} {account.lastName}
                &nbsp; email: {account.email} &nbsp;
            </label>
            
            <label onClick={() => setDeleteObjID(account.id)}>
                <i className="fas fa-trash-alt delete-icon-color"></i>
            </label>
            
            
        </div>
        ))    
    
    return (
        <div>
            <BorderedList itemListTitleName={accTypes} listItems={accountItems}></BorderedList>
            {deleteObjID !== null && 
            <div>
                <SubmitAction onComplete={() => setDeleteObjID(null)} 
                        ActionMethod={DeleteAccount} data={deleteObjID}></SubmitAction>
            </div>}
        </div>  
    )
    }


export default Accounts