import './index.css';

const arr_ru = [
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ь',
  'ы',
  'э',
  'ю',
  'я',
];

type KeyboardProps = {
  addGuessedLetter: (letter: string) => void;
  activeLetter: string[];
  inactiveLetters: string[];
  disabled?: boolean;
};

export function Keyboard({
  disabled = false,
  addGuessedLetter,
  activeLetter,
  inactiveLetters,
}: KeyboardProps) {
  return (
    <div className='keyboard'>
      {arr_ru.map((letter, index) => {
        const isActive = activeLetter.includes(letter);
        const isInActive = inactiveLetters.includes(letter);

        return (
          <button
            disabled={isInActive || isActive || disabled}
            onClick={() => addGuessedLetter(letter)}
            key={letter + index}
            className={`keyup ${isActive ? 'active' : ''} ${
              isInActive ? 'inactive' : ''
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
