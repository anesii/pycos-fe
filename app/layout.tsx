'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import React from 'react';
import { LoaderProvider } from 'app/loader/Loader'; // Import LoaderProvider
import './globals.css'
import Sidebar from 'app/components/layout/Sidebar'
import TopBar from 'app/components/layout/TopBar'
import MobileMenu from 'app/components/layout/MobileMenu'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    console.log('Mobile Menu Open:', isMobileMenuOpen);
    console.log('Is Mobile:', isMobile);
  }, [isMobileMenuOpen, isMobile]);

  return (
    <LoaderProvider>
      <html lang="en" className={inter.className}>
        <body className="bg-white">
          <div className="flex min-h-screen">
            <div className="hidden lg:block">
              <Sidebar />
            </div>

            {isMobile && (
              <MobileMenu 
                key="mobile-menu" 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
              />
            )}
            
            <div className="flex-1 lg:ml-64">
              <TopBar 
                onMenuClick={() => setIsMobileMenuOpen(true)}
                isMobile={isMobile}
              />
              
              <main className="pt-20 lg:pt-24 px-4 lg:px-8 m6">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </body>
      </html>
    </LoaderProvider>
  );
};

export default RootLayout;