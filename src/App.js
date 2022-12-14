import { useState } from "react";
import "./App.css";
import Checkbox from "./components/Checkbox";
import "./app.scss";

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(""));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className="password-generator">
      <div className="password-generator__wrapper">
        <div className="password-generator__containerbox">
          <h2 className="password-generator__title">Password Generator</h2>
          <div className="password-generator__passwordbox">
            <input
              className="password-generator__input"
              type="text"
              value={handleText}
              placeholder=""
              autoComplete="off"
              onChange={(e) => setHandleText(e.target.value)}
            />

            <button
              className="password-generator__copy"
              onClick={() => {
                if (handleText.length > 0) {
                  navigator.clipboard.writeText(handleText);
                  setCopied(true);
                  setInterval(() => {
                    setCopied(false);
                  }, 2000);
                }
              }}
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
            <br />
            <div className="password-generator__wordcriteria">
              <div>
                <label>Password length</label>
              </div>
              <div>
                <input
                  className="password-generator__input"
                  type="number"
                  min="4"
                  max="20"
                  value={passwordGen.length}
                  onChange={(e) => setPasswordLength(e.target.value)}
                />
              </div>
            </div>
            <div className="password-generator__wordcriteria">
              <div>
                <label>Include uppercase letters</label>
              </div>
              <div>
                <Checkbox
                  value={passwordGen.uppercase}
                  onChange={handleChangeUppercase}
                />
              </div>
            </div>
            <div className="password-generator__wordcriteria">
              <div>
                <label>Include lowercase letters</label>
              </div>
              <div>
                <Checkbox
                  value={passwordGen.lowercase}
                  onChange={handleChangeLowercase}
                />
              </div>
            </div>
            <div className="password-generator__wordcriteria">
              <div>
                <label>Include numbers</label>
              </div>
              <div>
                <Checkbox
                  value={passwordGen.numbers}
                  onChange={handleChangeNumbers}
                />
              </div>
            </div>
            <div className="password-generator__wordcriteria">
              <div>
                <label>Include symbols</label>
              </div>
              <div>
                <Checkbox
                  value={passwordGen.symbols}
                  onChange={handleChangeSymbols}
                />
              </div>
            </div>
            <div>
              <button
                className="password-generator__generate"
                onClick={generatePassword}
              >
                Generate password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
