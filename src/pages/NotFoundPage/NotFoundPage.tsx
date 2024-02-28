import { useTranslation } from 'react-i18next';
import './NotFoundPage.scss';

interface Props {
  tittle?: string;
  text?: string;
}

export const NotFoundPage: React.FC<Props> = ({ tittle = '', text = '' }) => {
  const { t } = useTranslation();

  return (
    <div className="text">
      {!tittle && (<h1>{t('notFound.error')}</h1>)}
      {!text && (<h2>{t('notFound.notFound')}</h2>)}
      {tittle && (<h1>{tittle}</h1>)}
      {text && (<h2>{text}</h2>)}
    </div>
  );
};
