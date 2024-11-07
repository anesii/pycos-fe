'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { name: 'Meals', path: '/meals' },
  { name: 'Exercises', path: '/exercises' },
  { name: 'Supplements', path: '/supplements' },
  { name: 'Community', path: '/community' },
  { name: 'Lifestyle Tips', path: '/lifestyle' },
  { name: 'Symptom Assessment', path: '/assessment' },
  { name: 'My Account', path: '/account' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const username = 'rabbitfox43' // TODO: Get from auth context

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-teal-500 text-white p-6">
      <div className="mb-8 flex items-center">
        <img src="/assets/logo-white.png" alt="PyCOS Logo"
        width={100} // Set your desired width
        height={100} // Set your desired height
         /> {/* Update the src to your logo path */}
      </div>
      <div>
      <h2 className="text-2xl font-semibold">Hi, {username}</h2>
      </div>
      
      <nav>
        <ul className="space-y-4">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block text-xl font-light py-2 transition-colors
                  ${pathname === item.path 
                    ? 'text-white' 
                    : 'text-teal-100 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}