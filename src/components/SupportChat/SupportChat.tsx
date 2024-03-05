import React, { useState } from 'react';
import './supportChat.scss';
import classNames from 'classnames';
import { IconButton } from '../UI/IconButton';

export const SupportChat:React.FC = () => {
  const [showChat, setShowChat] = useState(true);

  function handleShowChat() {
    setShowChat(!showChat);
  }

  const messages = [
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

  const myID = 1;
  const adminImgURL = 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=826&t=st=1709648780~exp=1709649380~hmac=e6da2190413b81007a9de61df1b142fc9fcd723c64a26f6c24a55053513a4dc7';
  const userImgURL = 'https://img.freepik.com/premium-vector/cute-bath-bombs-mascot-with-optimistic-face-cute-style-design-t-shirt-sticker-logo-element_152558-9578.jpg';

  return (
    <div className="supportChat">
      <button
        onClick={handleShowChat}
        className="showSupport"
      >
        Need help?
      </button>
      {showChat && (
        <div className="chatWindow">
          <div className="chatHeader">
            Support
          </div>
          <div className="chatBody">
            {messages.map(message => (
              <p className={classNames('chatMessage', {
                'chatMessage--from': message.authorId !== myID,
                'chatMessage--my': message.authorId === myID,
              })}
              >
                <img
                  src={myID === message.authorId ? userImgURL : adminImgURL}
                  alt="profilePhoto"
                  className="chatMessage__avatar"
                />
                <span className="chatMessage__text">{message.body}</span>
              </p>
            ))}
          </div>
          <div className="chatInputArea">
            <textarea placeholder="type your question here" />
            <IconButton type="sendMsg" />
          </div>
        </div>
      )}
    </div>
  );
};
