import React from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const logo = 'https://bucketsimilarity.s3.ap-northeast-2.amazonaws.com/Similarity-logo+(2).png';

interface IChatModal {
  visible: boolean;
}

export const ChatModal: React.FC<IChatModal> = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? 'opacity-0' : 'opacity-100'
      } flex flex-col fixed bottom-16 right-6 w-[400px] h-[50vh] rounded-md overflow-hidden ring-1 ring-gray-400 bg-white`}
    >
      <div className="flex items-center p-2">
        <img src={logo} className="w-24" />
        <span className="w-full px-5 text-right font-sans text-sm">인디</span>
      </div>
      <div className="border-t flex-1 p-2 scroll-hidden bg-white overscroll-y-contain ">
        <ul className="flex-1 overflow-x-hidden overflow-y-auto p-2 scroll-hidden bg-white overscroll-y-contain">
          <li className="my-0.5">
            <div className="text-sm cursor-default lg:text-xs text-gray-600 dark:text-gray-400 mt-2.5 mb-1 inline-flex items-center space-x-1.5 hover:text-gray-400">
              <span>닉네임</span>
            </div>
            <div className="flex items-end text-sm lg:text-xs rounded">
              <span className="py-1.5 px-2 rounded break-all bg-gray-200">글</span>
              <span className="mx-1.5 mb-0.5 text-xs whitespace-nowrap text-gray-500">03:18</span>
            </div>
          </li>
          <li className="my-0.5">
            <div className="text-sm cursor-default lg:text-xs text-gray-600 dark:text-gray-400 mt-2.5 mb-1 inline-flex items-center space-x-1.5 hover:text-gray-400">
              <span>닉네임</span>
            </div>
            <div className="flex items-end text-sm lg:text-xs rounded">
              <span className="py-1.5 px-2 rounded break-all bg-gray-200">글</span>
              <span className="mx-1.5 mb-0.5 text-xs whitespace-nowrap text-gray-500">03:18</span>
            </div>
          </li>
          <li className="my-0.5">
            <div className="text-sm cursor-default lg:text-xs text-gray-600 dark:text-gray-400 mt-2.5 mb-1 inline-flex items-center space-x-1.5 hover:text-gray-400">
              <span>닉네임</span>
            </div>
            <div className="flex items-end text-sm lg:text-xs rounded">
              <span className="py-1.5 px-2 rounded break-all bg-gray-200">글</span>
              <span className="mx-1.5 mb-0.5 text-xs whitespace-nowrap text-gray-500">03:18</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center p-2 border-t mb-auto">
        <span className="flex-1 py-1.5 lg:py-0.5 px-2 mr-1.5 rounded border border-gray-200 dark:border-0">
          <input type={'text'} value={'안녕'} className="w-full text-sm text-gray-800" />
        </span>
        <FontAwesomeIcon icon={faPaperPlane} className="px-3 py-1.5 text-gray-400 dark:text-gray-600" />
      </div>
    </div>
  );
};
