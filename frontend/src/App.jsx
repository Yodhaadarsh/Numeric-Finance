import React from 'react'
import MainRoutes from './routes/MainRoutes'
import Loader from './components/Loader'
import Navbar from './components/Navbar'

const App = () => {

  

  return (
    <div className='min-h-screen w-full bg-[#181B23]'>
      <Navbar/>
      {/* <Loader/> */}
      {/* <MainRoutes/> */}
    </div>
  )
}

export default App