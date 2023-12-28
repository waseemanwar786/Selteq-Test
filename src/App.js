import './App.css';
import DigitalClock from './Components/DigitalClock';
import { TodoWrapper } from './Components/TodoWrapper';
function App() {
  return (
    <div className="App">
    <TodoWrapper/>
    <DigitalClock/>
    </div>
  );
}

export default App;
