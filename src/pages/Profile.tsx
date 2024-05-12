import React, { useState } from 'react';
import client from '../api';
import { requestURL } from '../api/requests';

export const Profile = () => {
  const onSubmit = () => {
    console.log('hello');
    // client.post(requestURL.logout);
  };

  const [username, setUsername] = useState('naver@gmail.com');

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="mb-10 w-full max-w-screen-sm flex flex-col p-1 items-center">
        <div className="profileDiv">
          <span className="profileSpan">닉네임</span>
          <input
            type={'text'}
            value={username}
            className="profileInput hover:cursor-pointer hover:bg-gray-100"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="profileDiv">
          <span className="profileSpan">로그인 타입</span>
          <input type={'text'} value={'Google'} readOnly className="profileInput" disabled />
        </div>
        <button
          className="w-10/12 border mb-5 outline-gray-700 rounded-2xl p-5 mt-40 text-red-500 font-bold font-sans hover:bg-gray-100 transition-transform"
          onClick={onSubmit}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
