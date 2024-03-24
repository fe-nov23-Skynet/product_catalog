/* eslint-disable jsx-a11y/img-redundant-alt */
import './profilePage.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAuth0 } from '@auth0/auth0-react';
import { ReactComponent as Profile } from '../../styles/icons/profile.svg';

export const ProfilePage = () => {
  const {
    user,
    logout,
    loginWithRedirect,
    isAuthenticated,
  } = useAuth0();

  return (
    <div>
      {isAuthenticated && (
        <div className="profile_page">
          <h1 className="profile__title">Profile</h1>

          <div className="profile__info">

            <div className="profile__first">
              <img
                src={user?.picture}
                alt="Photo profile"
                className="profile__image"
              />

              <button
                className="button__logout"
                onClick={() => logout()}
              >
                Log out
              </button>
            </div>

            <div className="profile__data">
              <div className="descriptive__item">
                <span className="descriptive__words">Name:</span>
                <p className="profile__userData">{user?.name}</p>
              </div>

              <div className="descriptive__item">
                <span className="descriptive__words">Email:</span>
                <p className="profile__userData">{user?.email}</p>
              </div>

              <div className="descriptive__item">
                <span className="descriptive__words">Birthday:</span>
                <p className="profile__userData">{user?.birthdate || '01.01.2000'}</p>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};
