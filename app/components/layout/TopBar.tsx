'use client'

import { usePathname } from 'next/navigation'

interface TopBarProps {
  onMenuClick: () => void
  isMobile: boolean
}

export default function TopBar({ onMenuClick, isMobile }: TopBarProps) {
  const pathname = usePathname()
  const pageTitle = pathname.split('/')[1]?.charAt(0).toUpperCase() + pathname.split('/')[1]?.slice(1) || 'Dashboard'

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white px-4 lg:px-8 py-4 lg:py-6 flex items-center justify-between shadow-sm z-40">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            ☰
          </button>
        )}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{pageTitle}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="hidden lg:block text-teal-500 hover:text-teal-600 font-medium">
          CLICK TO DOWNLOAD YOUR MEAL PLAN
        </button>
        
        <button className="bg-teal-500 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors text-sm lg:text-base">
          {isMobile ? 'REGENERATE' : 'REGENERATE MEAL PLAN'}
        </button>
      </div>
    </header>
  )
}