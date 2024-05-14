import React, { useEffect, useState } from 'react';
import client from '../api';
import { requestURL } from '../api/requests';

interface IUser {
  id?: number;
  username: string;
  email?: string;
  loginType: string;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Profile = () => {
  const [profile, setProfile] = useState<IUser>({
    username: '',
    loginType: '',
  });

  const onSubmit = () => {
    try {
      client.post(requestURL.logout);
      localStorage.removeItem('u_info');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const item = localStorage.getItem('u_info')!;
    const userInfo = JSON.parse(item);
    if (userInfo.loginType !== 'Guest') {
      client
        .get<IUser>(requestURL.profile)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      setProfile(JSON.parse(item));
    }
  }, []);

  const editUserProfile = (): void => {
    client
      .post(requestURL.editProfile, profile)
      .then((res) => {
        const item = JSON.parse(localStorage.getItem('u_info')!);
        const userInfo = JSON.stringify({ ...item, username: profile.username });
        localStorage.setItem('u_info', userInfo);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="mb-10 w-full max-w-screen-sm flex flex-col p-1 items-center">
        <div className="profileDiv">
          <span className="profileSpan">이메일</span>
          <input type={'text'} value={profile?.email ? profile.email : 'Guest'} readOnly className="profileInput" disabled />
        </div>
        <div className="profileDiv">
          <span className="profileSpan">로그인 타입</span>
          <input type={'text'} value={profile?.loginType ? profile.loginType : ''} readOnly className="profileInput" disabled />
        </div>
        <div className="profileDiv">
          <span className="profileSpan">닉네임</span>
          <input
            type={'text'}
            value={profile?.username ? profile.username : ''}
            className="profileInput hover:cursor-pointer hover:bg-gray-100"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
        </div>
        <button
          className="w-10/12 border outline-gray-700 rounded-2xl p-5 text-red-500 font-bold font-sans hover:bg-gray-100 transition-transform"
          onClick={editUserProfile}
        >
          수정하기
        </button>
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
