'use client'

import { useStore } from '@/store/useStore'
import EmployeeCard from '@/components/employees/EmployeeCard'

export default function BookmarksPage() {
  const { employees, bookmarkedEmployees } = useStore()
  
  const bookmarkedEmployeesList = employees.filter((employee) =>
    bookmarkedEmployees.includes(employee.id)
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Bookmarked Employees</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage your bookmarked employees
        </p>
      </div>

      {bookmarkedEmployeesList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No bookmarked employees yet. Start bookmarking employees from the dashboard!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedEmployeesList.map((employee) => (
            <EmployeeCard key={employee.id} {...employee} />
          ))}
        </div>
      )}
    </div>
  )
} 