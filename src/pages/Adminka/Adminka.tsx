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
      <div className="adminka__buttons">
        <button onClick={handleShowList} className="adminka__button">
          <CloudLoadList />
          Load product list
        </button>
        <button onClick={handleShowProductForm} className="adminka__button">
          <PlusIcon />
          Add new product
        </button>
        <button onClick={handleShowChats} className="adminka__button">
          <PlusIcon />
          Show chats
        </button>
      </div>

      {showProductForm && (
        <div className="adminka__form">
          <ProductEditForm />
        </div>
      )}

      {showList && (
        <div className="adminka__list">
          <ProductTable />
        </div>
      )}

      {showChats && (
        <div className="adminka__chats">
          <Chatiki />
        </div>
      )}
    </div>
  );
};
