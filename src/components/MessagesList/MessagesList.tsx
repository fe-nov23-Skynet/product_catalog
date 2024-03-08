import { useRef } from 'react';
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

  return (
    <div className="chatBody chatBody--bg" ref={chatBody}>
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
  );
};
