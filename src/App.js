import './App.css';
import MenuBar from './admin-components/MenuBar'
import StudentMenuBar from './student-components/StudentMenuBar';
import ProfessorMenuBar from './professor-components/ProfessorMenuBar';

function App() {
  return (
    <div className="App">
      <ProfessorMenuBar></ProfessorMenuBar>
      <StudentMenuBar></StudentMenuBar>
      <MenuBar></MenuBar>
    </div>
  );
}

export default App;
