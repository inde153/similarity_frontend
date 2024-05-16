import React from 'react';
import { IGuesses } from '../pages/Similarity';

interface GuessesTablesProps {
  lastGuess: IGuesses | null;
  guesses: IGuesses[];
}

export const GuessesTables: React.FC<GuessesTablesProps> = ({ lastGuess, guesses }) => {
  return (
    <>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="th">#</th>
            <th className="th">추측 단어</th>
            <th className="th">유사도</th>
          </tr>
        </thead>
        {lastGuess && (
          <tbody>
            <tr>
              <td className="td font-semibold">{lastGuess.order}</td>
              <td className="td font-semibold">{lastGuess.word}</td>
              <td className="td font-semibold">{lastGuess.similarity}</td>
            </tr>
          </tbody>
        )}
        <tbody>
          {guesses
            .sort((a: IGuesses, b: IGuesses) => b.similarity - a.similarity)
            .map((ele: IGuesses, i: number) => {
              return (
                <tr key={ele.order} className={`${i === 0 ? 'border-t-[1px]' : null}`}>
                  <td className="td font-medium">{ele.order}</td>
                  <td className="td font-medium">{ele.word}</td>
                  <td className="td font-medium">{ele.similarity}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
