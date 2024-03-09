/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import './supportChat.scss';
import classNames from 'classnames';
import { IconButton } from '../UI/IconButton';
import { socket } from '../../socket';
import { Message } from '../../types/Chat';
import { userImgURL } from '../../utils/chatConstants';

const startMessages = [
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'Hey, can you help me?',
  },
  {
    authorId: 2,
    authorName: 'Alice',
    body: 'Sure, what do you need?',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'I\'m having trouble with my computer.',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'I\'m having trouble with my computer.',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'I\'m having trouble with my computer.',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'I\'m having trouble with my computer.',
  },
  {
    authorId: 2,
    authorName: 'Alice',
    body: 'What seems to be the problem?',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'It keeps crashing whenever I open this program.',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'It keeps crashing whenever I open this program.',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'It keeps crashing whenever I open this program.',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'It keeps crashing whenever I open this program.',
  },
  {
    authorId: 2,
    authorName: 'Alice',
    body: 'Have you tried restarting it?',
  },
  {
    authorId: 1,
    authorName: 'Pavlo',
    body: 'Yes, but it didn\'t help.',
  },
];
const myID = 2;

export const SupportChat: React.FC = () => {
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messageText, setMessageText] = useState('');
  const chatBody = useRef<HTMLDivElement>(null);

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(e.target.value);
  }

  function sendMessage() {
    if (messageText.trim()) {
      const message = {
        authorId: myID,
        authorName: 'Alice',
        body: messageText.trim(),
        avatarURL: userImgURL,
      };
      socket.emit('user:msg', message);
      setMessageText('');
    }
  }
  useEffect(() => {
    if (showChat && !messages.length) {
      socket.emit('user:needHelp');
    }
  }, [showChat]);

  useEffect(() => {
    if (chatBody.current) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
    }
  }, [messages.length]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onServerMessage(data: Message) {
      setMessages(prev => [...prev, data]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('server:msg', onServerMessage);
  }, []);

  function handleEnterTeaxtArea(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  function handleShowChat() {
    setShowChat(!showChat);
  }

  // eslint-disable-next-line no-restricted-globals
  if (!location.origin.includes('localhost')) {
    return null;
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
          </div>
          <div className="chatBody" ref={chatBody}>
            {messages.length > 0 && messages.map(message => (
              <p className={classNames('chatMessage', {
                'chatMessage--from': message.authorId !== myID,
                'chatMessage--my': message.authorId === myID,
              })}
              >
                <img
                  src={message.avatarURL}
                  alt="profilePhoto"
                  className="chatMessage__avatar"
                />
                <span className="chatMessage__text">{message.body}</span>
              </p>
            ))}
          </div>
          <div className="chatInputArea">
            <textarea
              placeholder="type your question here"
              onChange={handleTextArea}
              value={messageText}
              onKeyUp={handleEnterTeaxtArea}
            />
            <IconButton type="sendMsg" onClick={() => sendMessage()} />
          </div>
        </div>
      )}
    </div>
  );
};
