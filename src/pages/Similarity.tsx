import react, { ChangeEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import client from '../api';
import { requestURL } from '../api/requests';
import { ChatWidget } from '../components/ChatWidget';

interface IGuesses {
  order: number;
  word: string;
  similarity: number;
}

export const Similarity = () => {
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<IGuesses[]>(JSON.parse(localStorage.getItem('guesses') || '[]'));
  const [lastGuess, SetLastGuess] = useState<IGuesses | null>(null);

  const onSubmit = () => {
    client
      .post<IGuesses>(requestURL.guess, { name: word, categoryId: 1 })
      .then((res) => {
        const isValid = guesses.some((ele: IGuesses) => {
          return ele.word === word;
        });
        if (!isValid) {
          const guessesItems = { order: guesses.length + 1, word, similarity: res.data.similarity };
          SetLastGuess(guessesItems);
          setGuesses([...guesses, guessesItems]);
          localStorage.setItem('guesses', JSON.stringify([...guesses, guessesItems]));
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="mb-10 w-full max-w-screen-sm flex p-1 items-center bg-gray-100 ring-1 ring-gray-200">
        <input
          className="h-5/6 w-full px-5 text-sm rounded-lg outline-none"
          type="search"
          placeholder="추측 단어 입력"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button className="p-3 h-5/6 border flex items-center justify-center bg-gray-200" onClick={onSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
        </button>
      </div>
      <span className="text-base text-red-400 my-5">이번 문제는 만화 캐릭터 맞추기 문제입니다.</span>
      <div className="max-w-screen-sm">
        <table className="w-full text-center">
          <thead>
            <tr className="">
              <th className="th">#</th>
              <th className="th py-10">추측 단어</th>
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
                    <td className="td  font-medium">{ele.order}</td>
                    <td className="td  font-medium">{ele.word}</td>
                    <td className="td  font-medium">{ele.similarity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ChatWidget />
      </div>
    </div>
  );
};
