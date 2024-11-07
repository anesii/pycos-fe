'use client'

import React, { useEffect } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'


interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    console.log('MobileMenu mounted');
    return () => {
      console.log('MobileMenu unmounted');
    };
  }, []);

  if (!isOpen) return null; // Prevent rendering if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold">Mobile Menu</h2>
        {/* Add menu items here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MobileMenu;


