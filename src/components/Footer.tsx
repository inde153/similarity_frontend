import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer: React.FC = () => {
  const URL = 'https://github.com/inde153';

  return (
    <footer className="py-4">
      <div className="flex flex-col w-full h-40 px-5 xl:px-0 max-w-screen-lg mx-auto justify-center items-center gap-3">
        <div className="flex justify-center w-full font-bold border-b py-3">제작자</div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faGithub} className="text-2xl text-black w-12" />
          <button
            className="text-sm pr-5"
            onClick={() => {
              window.open(URL);
            }}
          >
            김동언
          </button>
        </div>
      </div>
    </footer>
  );
};
