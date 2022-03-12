import SignIn from "../login-components/SignIn"
import { useState } from 'react'
//logged in is a 0 or 1, 0 representing logged out, 1 representing logged in
const Header = ({onAccountRecieved, currentUserAccount, loggedIn}) => {
    const signInOrOutOpts = ["Logged Out", "Logged In", "Toggling"]
    const [toggleSignInOrOutStatus, setToggleSignInOrOutStatus] = useState(signInOrOutOpts[loggedIn])

    const logUserOut = () => {
        setToggleSignInOrOutStatus(signInOrOutOpts[0])
        onAccountRecieved(null)
        
    }

    const logUserIn = (accountReceived) => {
        console.log(accountReceived)
        setToggleSignInOrOutStatus(signInOrOutOpts[1])
        onAccountRecieved(accountReceived)
    }

    const toggleSignIn = () => {
        setToggleSignInOrOutStatus(signInOrOutOpts[2])
    }
    
    const signInAndOut = (
        <div>
            {loggedIn === 0 && toggleSignInOrOutStatus === signInOrOutOpts[2] &&
             <SignIn onAccountRecieved={logUserIn} ></SignIn>}

            {loggedIn === 1 && toggleSignInOrOutStatus === signInOrOutOpts[2] &&
             logUserOut()}
            
        </div>
    )


    return (
        <div>
            <div className="header same-line ">
                <div className="aligned-left default-mouse">
                    <label>Uni</label>
                </div>

                <div className="aligned-right pointer" >
                    {toggleSignInOrOutStatus !== signInOrOutOpts[2]  && //not trying to sign in or out yet, so give option
                        <label className="pointer"
                        onClick={toggleSignIn}>{toggleSignInOrOutStatus === signInOrOutOpts[0] ? 'Sign In' : 'Sign Out'}</label>}
                </div>
                
            </div>

            {toggleSignInOrOutStatus === signInOrOutOpts[2]  && //trying to sign in or out
                <div>
                        {signInAndOut}
                </div>}
        </div>
        
    )
}

export default Header