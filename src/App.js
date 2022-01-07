import './App.css';
import MenuBar from './admin-components/MenuBar'
import StudentMenuBar from './student-components/StudentMenuBar';

function App() {
  return (
    <div className="App">
      <StudentMenuBar></StudentMenuBar>
      <MenuBar></MenuBar>
    </div>
  );
}

export default App;
