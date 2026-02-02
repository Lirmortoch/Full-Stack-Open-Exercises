import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { NotificationCtxProvider } from './NotificationContext'

const QueryClient1 = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={QueryClient1}>
    <NotificationCtxProvider>
      <App />
    </NotificationCtxProvider>
  </QueryClientProvider>
)