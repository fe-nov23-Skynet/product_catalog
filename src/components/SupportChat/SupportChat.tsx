/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import './supportChat.scss';
import classNames from 'classnames';

import { socket } from '../../socket';
import { Message } from '../../types/Chat';
import { userImgURL } from '../../utils/chatConstants';
import { MessagesList } from '../MessagesList';
import { ChatSendArea } from '../ChatSendArea';
import { IconButton } from '../UI/IconButton';

const myID = 2;

export const SupportChat: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [typing, setTyping] = useState(false);

  function sendMessage(msgText: string) {
    if (msgText.trim()) {
      const message = {
        authorId: myID,
        authorName: 'Alice',
        body: msgText.trim(),
        avatarURL: userImgURL,
      };
      socket.emit('user:msg', message);
      // setMessages(prev => [...prev, message]);
      setTyping(true);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (showChat && !messages.length && !location.pathname.includes('adminka')) {
      socket.emit('user:needHelp');
    }
  }, [showChat]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onServerMessage(data: Message) {
      setMessages(prev => [...prev, data]);
      if (data.authorId !== myID) {
        setTyping(false);
      }
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('server:msg', onServerMessage);
  }, []);

  function handleShowChat() {
    setShowChat(!showChat);
  }

  // eslint-disable-next-line no-restricted-globals
  if (location.pathname.includes('adminka')) {
    return null;
  }

  return (
    <div className="supportChat">
      <button
        onClick={handleShowChat}
        className={classNames('showSupport', {
          'showSupport--close': showChat,
        })}
      >
        {!showChat ? 'Need help?' : 'Close chat'}
      </button>
      {showChat && (
        <div className="chatWindow">
          <div className="chatHeader">
            Support
            {isConnected && ' CONNECTED'}
            {!isConnected && ' DIS-CONNECTED'}
            <IconButton
              type="close"
              className="closeChat"
              onClick={handleShowChat}
            />
          </div>
          <MessagesList messages={messages} myID={myID} typing={typing} />
          <ChatSendArea onSend={sendMessage} />
        </div>
      )}
    </div>
  );
};
