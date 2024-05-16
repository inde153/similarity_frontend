import react, { ChangeEventHandler, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import client from '../api';
import { requestURL } from '../api/requests';
import { ChatWidget } from '../components/ChatWidget';
import { GuessesTables } from '../components/GuessesTables';

export interface IGuesses {
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
        setWord('');
      })
      .catch((e) => console.log(e));
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="mb-10 w-full max-w-screen-sm flex p-1 items-center bg-gray-100 ring-1 ring-gray-200">
        <ChatWidget />
        <input
          className="h-5/6 w-full px-5 text-sm rounded-lg outline-none"
          type="search"
          placeholder="추측 단어 입력"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => handleEnterPress(e)}
        />
        <button className="p-3 h-5/6 border flex items-center justify-center bg-gray-200" onClick={onSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
        </button>
      </div>
      <div className="max-w-screen-sm overflow-auto h-4/6 hide-scrollbar">
        <GuessesTables lastGuess={lastGuess} guesses={guesses} />
      </div>
    </div>
  );
};
