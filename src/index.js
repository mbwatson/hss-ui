import { App } from './app'
import { createRoot } from 'react-dom/client'
import { DugProvider } from 'dug';
import { DebugContextProvider } from 'debugger';

import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

const ProvisionedApp = () => (
  <DugProvider baseUrl="https://heal.renci.org/search-api/">
    <DebugContextProvider>
      <App />
    </DebugContextProvider>
  </DugProvider>
)

root.render(<ProvisionedApp />)
