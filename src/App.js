import logo from './logo.svg';
import './App.css';
import Toolbar from './Toolbar';
import MessageList from './MessageList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Toolbar />
        <MessageList />
      </header>
    </div>
  );
}

export default App;
