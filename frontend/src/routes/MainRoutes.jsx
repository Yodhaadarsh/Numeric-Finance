import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Profile from '../pages/Profile'
import GroupPage from '../pages/Group'
import AIChatPage from '../pages/AI-Chat'
import CreateExpense from '../pages/GenerateExpense'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/groups' element={<GroupPage/>} />
      <Route path='/ai-chat' element={<AIChatPage/>} />
      {/* <Route path='/transactions' element={<ExpenseForm/>} /> */}
       <Route path='/create/expense' element={<CreateExpense/>} />
    </Routes>
  )
}

export default MainRoutes