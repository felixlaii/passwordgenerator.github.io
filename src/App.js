import { useState } from 'react';
import './App.css';

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handleText, setHandleText] = useState('');
  const [copied, setCopied] = useState(false);
  return (
    <div className="App">
  
    </div>
  );
}

export default App;