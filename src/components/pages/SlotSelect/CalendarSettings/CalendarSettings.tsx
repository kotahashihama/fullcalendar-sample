import React from 'react';
import { User } from '../types';
import './CalendarSettings.css';

interface CalendarSettingsProps {
  users: User[];
  visibleUsers: Set<string>;
  onToggleUser: (userClass: string) => void;
  onClose: () => void;
}

const CalendarSettings: React.FC<CalendarSettingsProps> = ({
  users,
  visibleUsers,
  onToggleUser,
  onClose,
}) => {
  return (
    <div className="calendar-settings-overlay" onClick={onClose}>
      <div className="calendar-settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-settings-header">
          <h2>カレンダー設定</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="calendar-settings-content">
          <div className="calendar-settings-section">
            <h3>個人</h3>
            {users.filter((user, index) => index < 6).map((user) => (
              <div key={user.id} className="calendar-settings-item">
                <div className="user-info">
                  <div className={`user-avatar ${user.userClass}`}>
                    <img src={`https://i.pravatar.cc/32?u=${user.email}`} alt={user.name} />
                  </div>
                  <div className="user-details">
                    <div className="user-email">{user.email}</div>
                    {user.name !== user.email && <div className="user-status">家族</div>}
                  </div>
                </div>
                <button
                  className={`visibility-toggle ${visibleUsers.has(user.userClass) ? 'visible' : 'hidden'}`}
                  onClick={() => onToggleUser(user.userClass)}
                >
                  {visibleUsers.has(user.userClass) ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="calendar-settings-section">
            <h3>チーム</h3>
            <div className="team-header">
              <div className="team-name">S Spir</div>
            </div>
            {users.filter((user, index) => index >= 6).map((user) => (
              <div key={user.id} className="calendar-settings-item">
                <div className="user-info">
                  <div className={`user-avatar ${user.userClass}`}>
                    <img src={`https://i.pravatar.cc/32?u=${user.email}`} alt={user.name} />
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                  </div>
                </div>
                <button
                  className={`visibility-toggle ${visibleUsers.has(user.userClass) ? 'visible' : 'hidden'}`}
                  onClick={() => onToggleUser(user.userClass)}
                >
                  {visibleUsers.has(user.userClass) ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSettings;
