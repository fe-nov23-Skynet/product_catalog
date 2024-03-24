import { ReactComponent as Profile } from '../../styles/icons/profile.svg';
import './profilePage.scss';

export const ProfilePage = () => {
  const name = 'John Doe';

  return (
    <div className="profile_page">
      <h1 className="profile__title">Profile</h1>

      <div className="profile__info">
        <div className="profile__avatar">
          <Profile />
        </div>

        <div className="profile__data">
          <p className="profile__name">{name}</p>
        </div>
      </div>
    </div>
  );
};
