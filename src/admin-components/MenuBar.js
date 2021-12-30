import '@fortawesome/fontawesome-free/js/all.js';
import { useState } from 'react';
import AccountForm from './AccountForm';



const onClick = (pageName, setShowThisPage) => {
    setShowThisPage([pageName])
}
const MenuBar = () => {

    const [showThisPage, setShowThisPage] = useState('')
    const pageNames = [" Create Admin Account", " View Admin Accounts", " Create Professor Account", " View Professor Accounts",
                        " Create Student Account", " View Student Accounts", " Create Course", " View Current Courses"]

    const pageNamesPrefixes = [" Create ", " View "]

    const closeForm = () => {
        setShowThisPage('')
    }
    

    return (
        <div>
            <div className="icon-color">
                <label className="block black">Menu </label>

                <div className="icon-color" onClick={() => onClick(pageNames[0], setShowThisPage)}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[0]}</label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[1], setShowThisPage)}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageNames[1]}</label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[2], setShowThisPage)}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[2]}</label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[3], setShowThisPage)}>
                    <i className="far fa-list-alt"></i>
                    <label> {pageNames[3]} </label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[4], setShowThisPage)}>
                    <i className="fas fa-user-plus"></i>
                    <label> {pageNames[4]}</label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[5], setShowThisPage)}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[5]}</label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[6], setShowThisPage)}>
                    <i className="fas fa-plus"></i>
                    <label>{pageNames[6]}</label>
                </div>

                <div className="icon-color" onClick={() => onClick(pageNames[7], setShowThisPage)}>
                    <i className="far fa-list-alt"></i>
                    <label>{pageNames[7]}</label>
                </div>
            </div>

            <div>
                {/* if page name has prefix ' create ' */}
                {console.log("page matching: " + pageNamesPrefixes[0] + showThisPage)}              
                {pageNamesPrefixes[0] === showThisPage.toString().substring(0, pageNamesPrefixes[0].length) 
                && <AccountForm accType={showThisPage.toString().substring(pageNamesPrefixes[0].length)}
                onComplete={closeForm}/>}
               
            </div>

        </div>
        
        
    )
}


export default MenuBar