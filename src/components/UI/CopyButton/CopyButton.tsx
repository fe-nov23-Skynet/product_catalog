import classNames from 'classnames';
import './copyButton.scss';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { ReactComponent as CopyIcon } from './copy-svgrepo-com.svg';
import { ReactComponent as Done } from './done-all-round-svgrepo-com.svg';

interface Props {
  text: string;
  className?: string;
}

async function copyToClipboard(text: string) {
  try {
    // Використовуємо метод writeText для копіювання тексту в буфер обміну
    await navigator.clipboard.writeText(text);

    // Повертаємо true, оскільки копіювання пройшло успішно
    return true;
  } catch (error) {
    // Відловлюємо помилку та повертаємо false
    /* console.error('Помилка під час копіювання тексту:', error); */
    return false;
  }
}

export const CopyButton: React.FC<Props> = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const { text, className = '' } = props;

  function copyText() {
    copyToClipboard(text)
      .then(setIsCopied);
  }

  useEffect(() => {
    let timerID: NodeJS.Timeout | undefined;

    if (isCopied) {
      timerID = setTimeout(() => setIsCopied(false), 3000);
      toast.success(`ID: ${text} successfully copied to clipboard :)`);
    }

    return () => clearTimeout(timerID);
  }, [isCopied]);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      title="Copy ID"
      className={classNames('copy-button', className, { 'copy-button--copied': isCopied })}
      onClick={copyText}
    >
      <CopyIcon className={classNames('copy-icon', { 'copy-icon--show': !isCopied })} />
      <span className={classNames('done-icon', { 'done-icon--show': isCopied })}><Done /></span>

    </button>
  );
};
