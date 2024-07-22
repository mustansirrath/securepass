import { useState, useEffect } from "react";
import "../src/App.css";

function App() {
  const [password, setPassword] = useState("fnksa");
  const [len, setLength] = useState(7);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [strength, setStrength] = useState("Weak");

  useEffect(() => {
    generatePass();
  }, [len, numbers, char, strength, setPassword]);

  function generatePass() {
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let chars = "|@#$%^&*!~`/:;";
    if (numbers) string += number;
    if (char) string += chars;

    if (password.length >= 10 && char) setStrength("Moderate");
    if (password.length <= 10 && !char && !numbers) setStrength("Weak");
    if (char && numbers) setStrength("Moderate");
    if (password.length >= 15 && char && numbers) setStrength("Strong");
    if (password.length <= 15 && !char && !numbers) setStrength("Weak");

    let newClass = document.getElementById("strengthDiv");
    if (strength == "Weak") newClass.classList.add("weak");
    if (strength == "Weak") newClass.classList.remove("mod", "strong")
    if (strength == "Moderate") newClass.classList.add("mod");
    if (strength == "Moderate") newClass.classList.remove("strong","weak")
    if (strength == "Strong") newClass.classList.add("strong")
    if (strength == "Strong") newClass.classList.remove("mod", "weak")

    let newPass = "";
    for (let i = 1; i <= len; i++) {
      let randomPass = Math.floor(Math.random() * string.length);
      newPass += string.charAt(randomPass);
    }
    setPassword(newPass);
  }
  return (
    <>
      <section className="main">
        <div className="maindiv">
          <h2 className="heading">Password Generator</h2>
          <div className="fieldBtn">
            <input
              type="text"
              className="passwordInput"
              readOnly
              value={password}
            />
            <button className="generateBtn" onClick={generatePass}>
              Generate Password
            </button>
          </div>
          <div className="second">
            <div className="same">
              <input
                type="range"
                className="lengthSlider"
                min={0}
                max={50}
                name="length"
                onChange={(event) => {
                  setLength(event.target.value);
                }}
              />
              <label htmlFor="length">Length: {len}</label>
            </div>
            <div className="same twoSame">
              <input
                type="checkbox"
                name="numbs"
                onClick={() => {
                  numbers == false ? setNumbers(true) : setNumbers(false);
                }}
              />
              <label htmlFor="numbs">Add Numbers</label>
            </div>
            <div className="same twoSame">
              <input
                type="checkbox"
                onClick={() => {
                  char == false ? setChar(true) : setChar(false);
                }}
              />
              <label htmlFor="">Add Characters</label>
            </div>
            <div className="same streng" id="strengthDiv">
              <label className="strength">Password Strength:</label>
              <label htmlFor=""> {strength}</label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;