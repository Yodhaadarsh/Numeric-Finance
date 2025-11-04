import React from 'react'
import Banner from '../components/Banner'
import AccountBalance from '../components/Balance'
import FinanceDashboard from '../components/FinanceCard'
import SavingPlan from '../components/SavingPlan'
import OverviewGraph from '../components/Overview'
import DashboardOptionalSections from '../components/Groups'
import Footer from '../components/Footer'
import Dashboard from '../components/Dashboard'

const Home = () => {
  return (
    <div className='w-full mt-10'>
       <Dashboard/>
      {/* <Banner/> */}
      <div className=" gap-04 mt-6 flex-col">
        <AccountBalance/>
        <FinanceDashboard/>
      </div>
      <div className=" flex flex-col gap-4 ">
        <SavingPlan/>
        
      <OverviewGraph/> 
      </div>
      <div className='mt-5'><DashboardOptionalSections/></div>
      <Footer/>
    </div>
  )
}

export default Home