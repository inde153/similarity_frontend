import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const logo = 'https://bucketsimilarity.s3.ap-northeast-2.amazonaws.com/Similarity-logo+(2).png';

export const Header: React.FC = () => {
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-lg mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={logo} className="w-40" />
        </Link>
        <span className="text-xs">
          <Link to="/profile/">
            <FontAwesomeIcon icon={faUser} className="text-2xl w-20" />
          </Link>
        </span>
      </div>
    </header>
  );
};
