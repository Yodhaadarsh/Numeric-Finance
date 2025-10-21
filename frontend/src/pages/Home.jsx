import React from 'react'
import Banner from '../components/Banner'
import AccountBalance from '../components/Balance'
import FinanceDashboard from '../components/FinanceCard'
import SavingPlan from '../components/SavingPlan'
import OverviewGraph from '../components/Overview'
import DashboardOptionalSections from '../components/Groups'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='w-full mt-10'>
      <Banner/>
      <div className="flex gap-04 mt-6 flex-col">
        <AccountBalance/>
        <FinanceDashboard/>
      </div>
      <div className="flex gap-4 ">
        <SavingPlan/>
      <OverviewGraph/> 
      </div>
      <DashboardOptionalSections/>
      <Footer/>
    </div>
  )
}

export default Home