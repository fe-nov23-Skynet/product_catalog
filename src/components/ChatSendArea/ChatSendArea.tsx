import { useState } from 'react';
import { IconButton } from '../UI/IconButton';
import './ChatSendArea.scss';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSend: (...args: any) => void;
}

export const ChatSendArea: React.FC<Props> = (props) => {
  const { onSend } = props;
  const [messageText, setMessageText] = useState('');

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(e.target.value);
  }

  function sendMsg() {
    if (!messageText.trim()) {
      setMessageText('');
      return;
    }

    onSend(messageText);
    setMessageText('');
  }

  function handleEnterTeaxtArea(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  return (
    <div className="chatInputArea1">
      <textarea
        placeholder="type your question here"
        onChange={handleTextArea}
        value={messageText}
        onKeyUp={handleEnterTeaxtArea}
      />
      <IconButton type="sendMsg" onClick={() => sendMsg()} />
    </div>
  );
};
