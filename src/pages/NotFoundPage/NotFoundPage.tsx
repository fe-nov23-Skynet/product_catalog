import { useTranslation } from 'react-i18next';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text">
      <h1>{t('notFound.error')}</h1>
      <h2>{t('notFound.notFound')}</h2>
    </div>
  );
};
