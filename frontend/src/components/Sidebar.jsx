import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import Logout from './Logout'

const Sidebar = () => {
  return (
    <>
      <div className='p-1 md:p-4 w-44 md:w-1/2 flex flex-col border-r border-slate-500'>
      <SearchInput/>
      <div className='divider my-1 px-3'></div>
      <Conversations/>
      <Logout/>
      </div>

    </>
  
  )
}

export default Sidebar