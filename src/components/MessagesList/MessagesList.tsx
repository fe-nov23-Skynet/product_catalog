/* eslint-disable react/jsx-curly-brace-presence */
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Message } from '../../types/Chat';
import './messagesList.scss';
import { adminImgURL } from '../../utils/chatConstants';
import { Typing } from './Typing';

interface Props {
  messages: Message[];
  myID: number | string;
  typing?: boolean;
}

export const MessagesList: React.FC<Props> = (props) => {
  const { messages, myID, typing = false } = props;
  const chatBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBody.current) {
      chatBody.current.scrollTop = chatBody.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="chatBody1" ref={chatBody}>
      {messages.length > 0 && messages.map(
        message => {
          const a = 0;
          return message.authorId === 0 ? (
            <p className="chatMessage--system">{message.body}</p>
          ) : (
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
              <pre className="chatMessage__text">{message.body}</pre>
            </p>
          );
        },
      )}
      {typing && (
        <p className={classNames('chatMessage', 'chatMessage--from')}>
          <img
            src={adminImgURL}
            alt="profilePhoto"
            className="chatMessage__avatar"
          />
          <pre className="chatMessage__text">
            <Typing />
          </pre>
        </p>
      )}
    </div>
  );
};
