import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/FormError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { requestURL } from '../api/requests';

export const Login = () => {
  const CLIENT_ID = process.env.REACT_APP_SERVER_URI!;

  const loginByGoogle = () => {
    window.open(`${CLIENT_ID}/${requestURL.googleLogin}`, '_self');
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full font-bold text-3xl mb-28 text-center">시작하기</h4>
        <button className="btn loginBtn" onClick={() => loginByGoogle()}>
          <FontAwesomeIcon icon={faGoogle} className="text-lg" />
          <p className="p">구글 계정으로 계속하기</p>
        </button>
        <button className="btn loginBtn">
          <FontAwesomeIcon icon={faUser} className="text-lg" />
          <p className="p">게스트 상태로 계속하기</p>
        </button>
      </div>
    </div>
  );
};
