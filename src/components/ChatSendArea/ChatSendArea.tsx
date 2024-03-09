import { useState } from 'react';
import { IconButton } from '../UI/IconButton';
import './ChatSendArea.scss';

interface Props {
  onSend: () => void;
}

export const ChatSendArea: React.FC<Props> = (props) => {
  const { onSend } = props;
  const [messageText, setMessageText] = useState('');

  function handleTextArea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageText(e.target.value);
  }

  function handleEnterTeaxtArea(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      onSend();
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
      <IconButton type="sendMsg" onClick={() => onSend()} />
    </div>
  );
};
