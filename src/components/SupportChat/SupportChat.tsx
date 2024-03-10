/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import './supportChat.scss';
import classNames from 'classnames';
import OpenAI from 'openai';

import { IconButton } from '../UI/IconButton';
import { socket } from '../../socket';
import { Message } from '../../types/Chat';
import { adminImgURL, userImgURL } from '../../utils/chatConstants';
import { MessagesList } from '../MessagesList';
import { ChatSendArea } from '../ChatSendArea';

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

  // chatGPT
  /*   useEffect(() => {
      const fetchData = async () => {
        const assistant1 = await openai.beta.assistants.retrieve('asst_gc3HWkC5sYga6z1FOjzzjeT8');
        setAssistant(assistant1);
        const thread1 = await openai.beta.threads.create();
        setThread(thread1);
      };

      fetchData();
    }, []);

    async function sendMessage() {
      setMessageText('');

      if (assistant && thread) {
        const message = await openai.beta.threads.messages.create(
          thread.id,
          {
            role: 'user',
            content: messageText,
          },
        );
        const run = await openai.beta.threads.runs.create(
          thread.id,
          {
            assistant_id: assistant.id,
          },
        );
      }
    }

    useEffect(() => {
      setInterval(async () => {
        if (assistant && thread) {
          const messages3 = await openai.beta.threads.messages.list(
            thread.id,
          );
          console.log(messages3);
          const newMessages = messages3.data.map(msg => {
            if ('text' in msg.content[0]) {
              return {
                authorId: msg.role === 'assistant' ? 1 : 2,
                authorName: 'Alice',
                body: msg.content[0].text.value,
                avatarURL: msg.role === 'assistant' ? adminImgURL : userImgURL,
              };
            }
            return null;
          });
          setMessages(newMessages.filter(Boolean).reverse() as Message[]);
        }
      }, 2000);
    }, [assistant, thread]); */

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(e.target.value);
  }

  function sendMessage(msgText: string) {
    if (msgText.trim()) {
      const message = {
        authorId: myID,
        authorName: 'Alice',
        body: msgText.trim(),
        avatarURL: userImgURL,
      };
      socket.emit('user:msg', message);
      // setMessageText('');
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (showChat && !messages.length && !location.pathname.includes('adminka')) {
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
      console.log(data);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('server:msg', onServerMessage);
  }, []);

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
          <MessagesList messages={messages} myID={myID} />
          <ChatSendArea onSend={sendMessage} />
        </div>
      )}
    </div>
  );
};
