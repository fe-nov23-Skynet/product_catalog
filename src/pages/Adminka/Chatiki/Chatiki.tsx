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

export const Chatiki: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const messages = rooms.find(r => r.id === selectedRoom)?.messages || [];

  useEffect(() => {
    socket.emit('admin:rooms');
  }, []);

  useEffect(() => {
    socket.on('server:rooms', (supportRooms: Room[]) => {
      setRooms(prev => [...supportRooms]);
    });
  }, []);

  useEffect(() => {
    socket.on('server:msg', (message) => {
      console.log('server msg: ', message);

      setRooms((prevRooms) => {
        const newRooms = prevRooms.map((room) => {
          if (room.id === message.roomId) {
            return {
              ...room,
              messages: [...room.messages, message],
            };
          }
          return room;
        });
        return newRooms;
      });
    });
  }, []);

  function joinRoom(room: Room) {
    socket.emit('admin:joinRoom', { id: room.id });
  }

  function selectRoom(room: Room) {
    setSelectedRoom(room.id);
    joinRoom(room);
  }

  function sendMessage(message: string) {
    if (selectedRoom) {
      socket.emit('admin:msg', {
        roomId: selectedRoom,
        authorId: 1,
        authorName: 'ADMIN',
        body: message,
        avatarURL: adminImgURL,
      });
    }
  }

  return (
    <section className="supportSection">
      <article className="ticketsList">
        <p className="roomTitle">Tickets</p>
        <ul className="roomsList">
          {rooms.map((room) => (
            <li
              className={classNames('roomsList__room', {
                'roomsList__room--active': room.id === selectedRoom,
              })}
              key={room.id}
              onClick={() => selectRoom(room)}
            >
              {`Ticket: ${room.id}`}
            </li>
          ))}
        </ul>
      </article>

      <article className="roomChat">
        {!selectedRoom && (<p>Please select ticket</p>)}
        {selectedRoom && (
          <>
            <p className="roomTitle">{`Chat of ticket: ${selectedRoom}`}</p>
            <MessagesList messages={messages} myID={1} reUser />
            <ChatSendArea onSend={sendMessage} />
          </>
        )}
      </article>
    </section>
  );
};
