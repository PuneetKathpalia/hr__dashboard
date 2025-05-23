'use client'

import { useStore } from '@/store/useStore'
import EmployeeCard from '@/components/employees/EmployeeCard'

export default function FavoritesPage() {
  const { team, favorites } = useStore()
  
  const favoriteTeam = team.filter(person => favorites.includes(person.id))

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Favorite Team Members</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Quick access to your starred team members
        </p>
      </div>

      {favoriteTeam.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No favorites yet. Star some team members from the dashboard!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteTeam.map((person) => (
            <EmployeeCard key={person.id} {...person} />
          ))}
        </div>
      )}
    </div>
  )
} 