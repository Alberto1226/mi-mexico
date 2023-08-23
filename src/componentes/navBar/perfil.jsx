import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ userData, handleLogoutSuccess }) => {
  return (
    <div className="user-profile">
      {userData && (
        <div>
          <img
            src={userData.picture}
            alt="Imagen de perfil"
            className="profile-image"
          />
          <div className="user-info">
            <p className="user-name">
              {userData.name}, Bienvenido a MXTVMAS{' '}
            </p>
          </div>

          <button className="logout-button" onClick={handleLogoutSuccess}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Salir
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
