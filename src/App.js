import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import Header from './components/header/Header'
import Page from './components/Page'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className='App'>
          <Header />
          <Page />
        </div>
      </Router>
    </DataProvider>
  )
}

export default App