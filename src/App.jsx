import React, { useState } from 'react';
import './App.css';

const PasswordManager = () => {
  const [password, setPassword] = useState('GeneratedPassword');
  const [length, setLength] = useState(10);
  const [includeChars, setIncludeChars] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  //passwortd generator
  const generator = (length,includeChars,includeNumbers) => {
    let words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeChars) { words += "!@#$%^&*():<>?|}{]["; }
    if (includeNumbers) { words += "1234567890"; }
    let newp = "";
    const n = parseInt(length);
    for (let i = 0; i < n; i++) {
      let k = Math.floor(Math.random() * words.length);
      newp += words[k];
    }
    //console.log(length);
     setPassword(newp);
  };
  

  const handleLengthChange = (e) => {
    const newLength = e.target.value;
    setLength(newLength);
    generator(newLength, includeChars, includeNumbers);
  };

  const handleChars = () => {
    const newIncludeChars = !includeChars;
    setIncludeChars(newIncludeChars);
    //console.log(length);
    generator(length, newIncludeChars, includeNumbers);
  };

  const handleNumber = () => {
    const newIncludeNumbers = !includeNumbers;
    setIncludeNumbers(newIncludeNumbers);
    generator(length, includeChars, newIncludeNumbers);
  };




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-violet-300">

      <h1 className="text-5xl font-bold mb-8 animate-bounce">Password Manager</h1>

      <div className="bg-violet-400 border-8 border-violet-500  p-10 rounded shadow-lg flex flex-col items-center space-y-4">
        
        <div className="flex items-center space-x-4">
          <input
            className="text-xl px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={password}
            readOnly
          />

          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>

       
        <div className="flex  items-center">
          <label className="text-xl mb-2" htmlFor="length">
            Length: {length}
          </label>
          <input
            className="w-full"
            type="range"
            id="length"
            name="length"
            min="6"
            max="50"
            value={length}
            onChange={handleLengthChange}
          />
        </div>

        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="characters"
              checked={includeChars}
              onChange={handleChars}
            />
            <label className="ml-2 text-xl" htmlFor="characters">
              Characters
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={handleNumber}
            />
            <label className="ml-2 text-xl" htmlFor="numbers">
              Numbers
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PasswordManager;
