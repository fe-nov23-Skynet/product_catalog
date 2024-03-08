/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { socket } from '../../../socket';
import './Chatiki.scss';
import { Room } from '../../../types/Chat';
import { MessagesList } from '../../../components/MessagesList';

const adminImgURL = 'https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=826&t=st=1709648780~exp=1709649380~hmac=e6da2190413b81007a9de61df1b142fc9fcd723c64a26f6c24a55053513a4dc7';
const userImgURL = 'https://img.freepik.com/premium-vector/cute-bath-bombs-mascot-with-optimistic-face-cute-style-design-t-shirt-sticker-logo-element_152558-9578.jpg';

const initialRooms: Room[] = [
  {
    id: 1,
    messages: [
      { authorId: 1, authorName: 'John', body: 'Hello!', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Hi John!', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'How are you?', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'I\'m fine, thank you!', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Great!', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'How about you?', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'I\'m doing well too!', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'That\'s good to hear!', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'What have you been up to?', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Not much, just working.', avatarURL: userImgURL },
    ],
  },
  {
    id: 2,
    messages: [
      { authorId: 1, authorName: 'John', body: 'Hey there!', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Hi John!', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'How\'s it going?', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Not too bad, thanks!', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'What are you up to?', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Just relaxing at home.', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Sounds nice!', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Yeah, it\'s been a long week.', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Well, the weekend is almost here!', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'That\'s true!', avatarURL: userImgURL },
    ],
  },
  {
    id: 3,
    messages: [
      { authorId: 1, authorName: 'John', body: 'Message 1', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 2', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 3', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 4', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 5', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 6', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 7', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 8', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 9', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 10', avatarURL: userImgURL },
    ],
  },
  {
    id: 4,
    messages: [
      { authorId: 1, authorName: 'John', body: 'Message 1', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 2', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 3', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 4', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 5', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 6', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 7', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 8', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 9', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 10', avatarURL: userImgURL },
    ],
  },
  {
    id: 5,
    messages: [
      { authorId: 1, authorName: 'John', body: 'Message 1', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 2', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 3', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 4', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 5', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 6', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 7', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 8', avatarURL: userImgURL },
      { authorId: 1, authorName: 'John', body: 'Message 9', avatarURL: adminImgURL },
      { authorId: 2, authorName: 'Alice', body: 'Message 10', avatarURL: userImgURL },
    ],
  },
];
export const Chatiki: React.FC = () => {
  const [rooms, setRooms] = React.useState<Room[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(rooms[0] || null);
  useEffect(() => {
    socket.emit('admin:rooms');
  }, []);

  useEffect(() => {
    socket.on('server:rooms', (supportRooms: Room[]) => {
      setRooms(prev => [...prev, ...supportRooms]);
    });
  }, []);

  return (
    <section className="supportSection">
      <ul className="roomsList">
        {rooms.map((room) => (
          <li
            className={classNames('roomsList__room', {
              'roomsList__room--active': room.id === selectedRoom?.id,
            })}
            key={room.id}
            onClick={() => setSelectedRoom(room)}
          >
            {`Room: ${room.id}`}
          </li>
        ))}
      </ul>
      <article className="roomChat">
        <p className="roomTitle">{`Room: ${selectedRoom?.id}`}</p>
        <MessagesList messages={selectedRoom?.messages || []} myID={1} />
      </article>
    </section>
  );
};
