import './index.css';

type HangmanWordProps = {
  letters: string[];
  wordTo: string;
  reveal?: boolean;
};

export function HangmanWord({
  letters,
  wordTo,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div className='word'>
      {wordTo.split('').map((letter, index) => (
        <span key={index} className='text'>
          <span
            style={{
              color: !letters.includes(letter) && reveal ? 'red' : 'black',
            }}
            className={`${
              letters.includes(letter) || reveal ? 'visible' : 'hidden'
            }`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
