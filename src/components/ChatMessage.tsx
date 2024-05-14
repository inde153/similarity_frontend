import React from 'react';
import { IMessage } from './ChatModal';

interface IAnotherProps {
  chatMessages: IMessage[];
}

export const ChatMessage: React.FC<IAnotherProps> = ({ chatMessages }) => {
  return (
    <>
      <ul className="flex-1 overflow-x-hidden overflow-y-auto p-2 scroll-hidden bg-white overscroll-y-contain">
        {chatMessages.map((ele: IMessage, i: number) => {
          return (
            <li key={i} className="my-0.5">
              <div className="text-sm cursor-default lg:text-xs text-gray-600 dark:text-gray-400 mt-2.5 mb-1 inline-flex items-center space-x-1.5 hover:text-gray-400">
                <span>{ele.username}</span>
              </div>
              <div className="flex items-end text-sm lg:text-xs rounded">
                <span className="py-1.5 px-2 rounded break-all bg-gray-200">{ele.message}</span>
                <span className="mx-1.5 mb-0.5 text-xs whitespace-nowrap text-gray-500">{ele?.date ? String(ele.date) : ''}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
