import { PanelLeftOpen } from 'lucide-react'
import React from 'react'

export default function Navbar({ hideShowSideBar }: { hideShowSideBar: () => void }) {
  return (
	  <div className='md:hidden sticky bg-secondary dark:bg-secondary border-b border-border-color1 py-2 px-2 w-full'>
		  <PanelLeftOpen className='w-6 h-6 text-text3 dark:text-text3 cursor-pointer' onClick={hideShowSideBar} />
	  </div>
  )
}
