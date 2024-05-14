import React, { useEffect, useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { io } from 'socket.io-client';
import { ChatMessage } from './ChatMessage';
const logo = 'https://bucketsimilarity.s3.ap-northeast-2.amazonaws.com/Similarity-logo+(2).png';

interface IChatModal {
  visible: boolean;
}

export interface IMessage {
  id: string;
  username: string;
  message: string;
  date?: Date;
}

type inputObject = {
  username: string;
  message: string;
};

export const ChatModal: React.FC<IChatModal> = ({ visible }) => {
  const socket = io(`${process.env.REACT_APP_SERVER_URI}/chat`, { autoConnect: false });

  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const item = JSON.parse(localStorage.getItem('u_info')!);
  const username = item.username;

  useEffect(() => {
    const handleConnect = () => {
      console.log('Socket connected', socket.connected);
      socket.emit('setInit', { username }, (response: any) => {});
      socket.emit('getOldComments', {}, (data: IMessage[]) => {
        setChatMessages(data);
      });
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
    };

    const handleGetMessage = (data: IMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
      setMessageInput('');
    };

    socket.connect();
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('getMessage', handleGetMessage);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('getMessage');
      socket.disconnect();
    };
  }, []);

  const onSubmit = () => {
    socket.connect();
    if (!messageInput.trim()) return;
    const data: inputObject = {
      message: messageInput,
      username,
    };
    socket.emit('sendMessage', data);
  };

  return (
    <div
      className={`${
        !visible ? 'opacity-0' : 'opacity-100'
      } flex flex-col fixed bottom-16 right-6 w-[400px] h-[50vh] rounded-md overflow-hidden ring-1 ring-gray-400 bg-white`}
    >
      <div className="flex items-center p-2">
        <img src={logo} className="w-24" />
        <span className="w-full px-5 text-right font-sans text-sm">{username}</span>
      </div>
      <div className="border-t flex-1 p-2 scroll-hidden bg-white overscroll-y-contain ">
        <ChatMessage chatMessages={chatMessages} />
      </div>
      <div className="flex items-center p-2 border-t mb-auto">
        <span className="flex-1 py-1.5 px-2 mr-1.5 rounded border border-gray-200 dark:border-0">
          <input
            type={'text'}
            value={messageInput}
            className="outline-none pl-1 w-full text-sm text-gray-800"
            onChange={(e) => setMessageInput(e.target.value)}
          />
        </span>
        <FontAwesomeIcon icon={faPaperPlane} className="px-3 py-1.5 text-gray-400 bg-gray-100 cursor-pointer" onClick={onSubmit} />
      </div>
    </div>
  );
};
