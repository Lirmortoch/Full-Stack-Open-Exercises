import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

const AppProvider = ({ children }) => {
  return (
    <NotificationContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </NotificationContextProvider>
  );
}

export default AppProvider;