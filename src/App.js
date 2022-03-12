import './App.css';
import { useState } from 'react';
import MenuBarController from './login-components/MenuBarController';
import Header from './header-components/Header';

function App() {
  const [userAccount, setUserAccount] = useState(null)

  const onAccountRecieved = (loggedInAccount) => {
    setUserAccount(loggedInAccount)
  }
  
  return (
    <div className="App">
      {userAccount === null &&
      ////logged in is a 0 or 1, 0 representing logged out, 1 representing logged in
        <Header onAccountRecieved={onAccountRecieved} currentUserAccount={userAccount} loggedIn={0} ></Header>
      }
      {userAccount !== null &&
      //onAccountReceived needed since opens its own header that's given the account but user
      //can log out, which will do onAccountReceived(null)
        <MenuBarController loggedInAccount={userAccount} onAccountRecieved={onAccountRecieved} setUserAccount={setUserAccount}
        ></MenuBarController>
      }
      
    </div>
  );
}

export default App;
