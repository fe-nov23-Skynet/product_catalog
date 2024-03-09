import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Message } from '../../types/Chat';
import './messagesList.scss';

interface Props {
  messages: Message[];
  myID: number | string;
}

export const MessagesList: React.FC<Props> = (props) => {
  const { messages, myID } = props;
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
              <span className="chatMessage__text">{message.body}</span>
            </p>
          );
        },
      )}
    </div>
  );
};
