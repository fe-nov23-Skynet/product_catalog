/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { socket } from '../../../socket';
import './Chatiki.scss';
import { Room } from '../../../types/Chat';
import { MessagesList } from '../../../components/MessagesList';
import { ChatSendArea } from '../../../components/ChatSendArea';
import { adminImgURL } from '../../../utils/chatConstants';

/* const initialRooms: Room[] = [
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
]; */

export const Chatiki: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Room['messages']>([]);

  useEffect(() => {
    socket.emit('admin:rooms');
  }, []);

  useEffect(() => {
    socket.on('server:rooms', (supportRooms: Room[]) => {
      setRooms(prev => [...prev, ...supportRooms]);
    });
  }, []);

  useEffect(() => {
    socket.on('server:msg', (message) => {
      if (selectedRoom?.id === message.roomId) {
        setMessages((prev) => [...prev, message]);
      }
      /* setRooms((prev) => {
        const newRooms = prev.map((room) => {
          if (room.id === message.roomId) {
            return {
              ...room,
              messages: [...room.messages, message],
            };
          }
          return room;
        });
        return newRooms;
      }); */
    });
  }, [selectedRoom?.id]);

  function joinRoom(room: Room) {
    socket.emit('admin:joinRoom', { id: room.id });
  }

  function selectRoom(room: Room) {
    setSelectedRoom(room);
    joinRoom(room);
    setMessages((prev) => [...prev, ...room.messages]);
  }

  function sendMessage(message: string) {
    if (selectedRoom) {
      socket.emit('admin:msg', {
        roomId: selectedRoom.id,
        authorId: 1,
        authorName: 'ADMIN',
        body: message,
        avatarURL: adminImgURL,
      });
    }
  }

  return (
    <section className="supportSection">
      <ul className="roomsList">
        {rooms.map((room) => (
          <li
            className={classNames('roomsList__room', {
              'roomsList__room--active': room.id === selectedRoom?.id,
            })}
            key={room.id}
            onClick={() => selectRoom(room)}
          >
            {`Room: ${room.id}`}
          </li>
        ))}
      </ul>
      <article className="roomChat">
        <p className="roomTitle">{`Room: ${selectedRoom?.id}`}</p>
        <MessagesList messages={messages} myID={1} />
        <ChatSendArea onSend={sendMessage} />
      </article>
    </section>
  );
};
