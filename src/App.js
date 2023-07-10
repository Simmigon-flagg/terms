import StudyWords from './StudyWords';
import { words } from './data'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StudyWords words={words} />
      </header>
    </div>
  );
}

export default App;
