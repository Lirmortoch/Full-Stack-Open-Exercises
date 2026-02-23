import { NotificationProvider } from './NotificationContext';

const AppProvider = ({ children }) => {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
}

export default AppProvider;