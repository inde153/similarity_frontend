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
              <div className="text-xs cursor-default  text-gray-600 dark:text-gray-400 mt-2.5 mb-1 inline-flex items-center space-x-1.5 hover:text-gray-400">
                {ele.isSelf || (i > 0 && (ele.id === chatMessages[i - 1].id || ele.email === chatMessages[i - 1].email)) ? (
                  <></>
                ) : (
                  <span>{ele.username}</span>
                )}
              </div>
              <div className={`flex items-end text-xs rounded ${ele.isSelf ? 'justify-end' : 'justify-start'}`}>
                {ele.isSelf ? (
                  <>
                    <span className="mx-1.5 mb-0.5 text-xs  whitespace-nowrap text-gray-500">{ele?.date ? String(ele.date) : ''}</span>
                    <span className="py-1.5 px-2 rounded break-all bg-gray-200">{ele.message}</span>
                  </>
                ) : (
                  <>
                    <span className="py-1.5 px-2 rounded break-all bg-gray-200">{ele.message}</span>
                    <span className="mx-1.5 mb-0.5 text-xs  whitespace-nowrap text-gray-500">{ele?.date ? String(ele.date) : ''}</span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
