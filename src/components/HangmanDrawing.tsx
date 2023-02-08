import './index.css';

// Элементы
const HEAD = <div className='head'></div>;
const BODY = <div className='body'></div>;
const RIGHT_ARM = <div className='right-arm'></div>;
const LEFT_ARM = <div className='left-arm'></div>;
const RIGHT_LEG = <div className='right-leg'></div>;
const LEFT_LEG = <div className='left-leg'></div>;

// Отрисовка элементов
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOf: number;
};

export function HangmanDrawing({ numberOf }: HangmanDrawingProps) {
  return (
    <div key={numberOf} className='hangman'>
      {BODY_PARTS.slice(0, numberOf)}
      <div className='linear__1'></div>
      <div className='linear__2'></div>
      <div className='linear__3'></div>
      <div className='linear__4'></div>
    </div>
  );
}
