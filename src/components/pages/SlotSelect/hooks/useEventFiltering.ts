import { useState, useMemo } from 'react';
import { Event, User } from '../types';

export const useEventFiltering = (events: Event[], users: User[]) => {
  const [visibleUsers, setVisibleUsers] = useState<Set<string>>(
    new Set(users.map(user => user.userClass))
  );

  // イベントのフィルタリング
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // available-slot は常に表示
      if (event.className?.includes('available-slot')) {
        return true;
      }

      // existing-event の場合、ユーザーの表示設定に従う
      if (event.className?.includes('existing-event')) {
        const userClass = users.find(user =>
          event.className?.includes(user.userClass)
        )?.userClass;

        return userClass ? visibleUsers.has(userClass) : true;
      }

      return true;
    });
  }, [events, users, visibleUsers]);

  const handleToggleUser = (userClass: string) => {
    setVisibleUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userClass)) {
        newSet.delete(userClass);
      } else {
        newSet.add(userClass);
      }
      return newSet;
    });
  };

  return {
    visibleUsers,
    filteredEvents,
    handleToggleUser,
  };
};
