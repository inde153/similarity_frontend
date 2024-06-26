import React, { useEffect, useRef, useState } from 'react';

import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChatModal } from './ChatModal';

export const ChatWidget = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
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
