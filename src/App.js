import './App.css';
import { useState } from 'react';
import SignIn from './login-components/SignIn';
import MenuBarController from './login-components/MenuBarController';

function App() {
  const [userAccount, setUserAccount] = useState(null)

  const onAccountRecieved = (loggedInAccount) => {
    setUserAccount(loggedInAccount)
  }
  
  return (
    <div className="App">
      {userAccount == null &&
        <SignIn onAccountRecieved={onAccountRecieved}></SignIn>
      }
      {userAccount != null &&
        <MenuBarController loggedInAccount={userAccount}></MenuBarController>
      }
      
    </div>
  );
}

export default App;
