import React from 'react'
import './styles/index.css'

import CameraFeed from './components/CameraFeed'
import MintNav from './components/MintNav'

const App = () => {

  return (
    <>
      <MintNav />
      <div className="App">
        <h1 className='mt-2 mb-2'>Digital Mirror with Effects!</h1>
        <CameraFeed />
      </div>
    </>
  )
}

export default App
