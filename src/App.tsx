import { useState, useEffect, useCallback } from 'react';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HangmanWord } from './components/HangmanWord';
import { Keyboard } from './components/Keyboard';
import words from './wordList.json';
import './App.css';

interface KeyboardEvent {
  preventDefault(): unknown;
  key: string;
}

// Случайное слово
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordTo, setWordTo] = useState(getWord);
  const [letters, setLetters] = useState<string[]>([]);

  // Определяем какой буквы нет в слове
  const inCorrectLetters = letters.filter(letter => {
    return !wordTo.includes(letter);
  });

  // Проверка попыток на кол-во
  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordTo.split('').every(letter => letters.includes(letter));

  // Добавляем букву в массив (история ввода)
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (letters.includes(letter) || isLoser || isWinner) return;
      setLetters(currentLetters => [...currentLetters, letter]);
    },
    [letters, isWinner, isLoser],
  );

  // Событие ввода букв с клавиатуры
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[ЁёА-я]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [letters]);

  // Новая игра
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;

      e.preventDefault();
      setLetters([]);
      setWordTo(getWord());
    };

    document.addEventListener('keypress', handler);
    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div className='app'>
      <div className='app__message'>
        {isWinner && 'Вы выиграли 👍. Для новой игры нажми Enter'}
        {isLoser && 'Вы проиграли 👎. Для новой игры нажми Enter'}
      </div>
      <HangmanDrawing numberOf={inCorrectLetters.length} />
      <HangmanWord reveal={isLoser} letters={letters} wordTo={wordTo} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetter={letters.filter(letter => wordTo.includes(letter))}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
