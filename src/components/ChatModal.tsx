import React from 'react';

interface IChatModal {
  visible: boolean;
}

export const ChatModal: React.FC<IChatModal> = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? 'opacity-0' : 'opacity-100'
      } fixed bottom-16 right-6 w-[400px] h-[50vh] rounded-2xl overflow-hidden ring-1 ring-gray-400 bg-white`}
    >
      <div className="flex items-center p-2">
        <span className="w-full text-center font-sans">채팅</span>
      </div>
    </div>
  );
};
