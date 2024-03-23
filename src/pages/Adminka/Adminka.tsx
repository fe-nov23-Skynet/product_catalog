import { useState } from 'react';
import './Adminka.scss';
import { ReactComponent as PlusIcon } from '../../styles/icons/plus.svg';
import { ReactComponent as CloudLoadList } from '../../styles/icons/cloudLoadList.svg';
import { ProductEditForm } from './ProductEditForm/ProductEditForm';
import { ProductTable } from './ProductTable/ProductTable';
import { Chatiki } from './Chatiki';

export const Adminka = () => {
  const [showList, setShowList] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showChats, setShowChats] = useState(true);

  // #region handleShowList
  function handleShowList() {
    setShowList(!showList);
    setShowProductForm(false);
    setShowChats(false);
  }

  function handleShowProductForm() {
    setShowList(false);
    setShowProductForm(!showProductForm);
    setShowChats(false);
  }

  function handleShowChats() {
    setShowList(false);
    setShowProductForm(false);
    setShowChats(!showChats);
  }
  // #endregion

  return (
    <div className="adminka">
      <h2>Support center</h2>

      {showChats && (
        <div className="adminka__chats">
          <Chatiki />
        </div>
      )}
    </div>
  );
};
