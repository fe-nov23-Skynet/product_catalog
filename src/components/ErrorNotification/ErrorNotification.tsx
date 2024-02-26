/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface Props {
  message: string;
}

export const ErrorNotification: React.FC<Props> = ({ message }) => {
  const a = 0;

  return (
    <div className="FlashMessageBaseWrapper_message__a8Hvh DefaultFlashMessageItem_error__VDAtp message-enter-done">
      <div className="DefaultFlashMessageItem_iconWrapper__ESYW4">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M16.0013 2.66699C8.62797 2.66699 2.66797 8.62699 2.66797 16.0003C2.66797 23.3737 8.62797 29.3337 16.0013 29.3337C23.3746 29.3337 29.3346 23.3737 29.3346 16.0003C29.3346 8.62699 23.3746 2.66699 16.0013 2.66699ZM22.668 20.787L20.788 22.667L16.0013 17.8803L11.2146 22.667L9.33464 20.787L14.1213 16.0003L9.33464 11.2137L11.2146 9.33366L16.0013 14.1203L20.788 9.33366L22.668 11.2137L17.8813 16.0003L22.668 20.787Z" fill="currentColor" />
        </svg>
      </div>
      <div className="DefaultFlashMessageItem_contentWrapper__6VpjV">
        <p className="typography_platformH3__h6hcY DefaultFlashMessageItem_heading__zLKAx">Помилка</p>
        <p className="typography_platformTextSecondary__oKVE4 DefaultFlashMessageItem_description__yrTxO">
          Будь ласка, перевір інтернет зєднання спробуй пізніше
        </p>
      </div>
      <div className="FlashMessageBaseWrapper_closeButtonWrapper__Y4_5d">
        <button type="button" className="ton_only">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ButtonBody_icon__2XJ9R icon">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
          </svg>
        </button>
      </div>
      <div className="FlashMessageTimerLine_timerLine__fRR_y" />
    </div>
  );
};
