import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';

/* const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};
*/

const MiComponente = (props) => {
  const [clipDev, setClipDev] = useState<string[]>([]);
  // const [lastClipDev, setLastClipDev] = useState();
  let lastClipDev = 'aaaa';
  useEffect(() => {
    const clipInterval = setInterval(() => {
      const text = window.electron.clipboardOS.readText();
      setClipDev((clipBoardOriginal: string[]) => {
        const clipBoard = [...clipBoardOriginal];
        const clipSize = clipBoard.length;
        console.log(lastClipDev);
        if (
          text !== lastClipDev &&
          (clipSize === 0 || clipBoard[clipSize - 1] !== text)
        ) {
          clipBoard.push(text);
        }
        return clipBoard;
      });
    }, 1000);

    return () => {
      clearInterval(clipInterval);
    };
  }, [lastClipDev]);

  function sendToClipboard(e: React.MouseEvent<HTMLElement>) {
    // console.log(e.target.textContent);
    lastClipDev = e.target.textContent;
    window.electron.clipboardOS.writeText(lastClipDev);
  }

  const clipItems = clipDev.map((element) => (
    <div onClick={sendToClipboard} className="componente1">
      {element}
    </div>
  ));
  return (
    <div>
      <h3>Historial CLipDev</h3>
      {clipItems}
    </div>
  );
};

export default function App(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MiComponente />} />
      </Routes>
    </Router>
  );
}
