import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatModal } from './ChatModal';

interface Message {
  sender: string;
  message: string;
}

export const ChatWidget = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const socket = io(`${process.env.REACT_APP_SERVER_URI}/chat`);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [meChatMessages, setMeChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('message', (data: Message) => {
      setMeChatMessages([data]);
      setMessageInput('');
    });

    return () => {
      socket.off();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', messageInput);
  };
  // const widgetRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     if (widgetRef.current && !widgetRef.current.contains(event.target)) {
  //       setVisible(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [widgetRef]);

  return (
    // <div ref={widgetRef}>
    <div>
      <ChatModal visible={visible} />
      <div onClick={() => setVisible(!visible)} className="fixed bottom-5 right-5 px-2 py-2 rounded-2xl cursor-pointer bg-orange-200">
        <div className="flex justify-center text-center">
          <FontAwesomeIcon icon={faComments} className="text-2xl text-white w-12" />
          <span className="text-sm pr-5">Chat Now!!</span>
        </div>
      </div>
    </div>
  );
};
