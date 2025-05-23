'use client'

import { useStore } from '@/store/useStore'

export default function AnalyticsPage() {
  const { employees } = useStore()

  // Calculate statistics
  const stats = {
    totalEmployees: employees.length,
    promotedEmployees: employees.filter(emp => emp.isPromoted).length,
    averageRating: employees.length
      ? (employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / employees.length).toFixed(1)
      : 0,
    departmentStats: employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of employee performance and statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Employees</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.totalEmployees}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Promoted Employees</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{stats.promotedEmployees}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Average Rating</h3>
          <p className="mt-2 text-3xl font-semibold text-yellow-600">{stats.averageRating}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Promotion Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-purple-600">
            {stats.totalEmployees ? Math.round((stats.promotedEmployees / stats.totalEmployees) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Department Distribution</h3>
          <div className="space-y-4">
            {Object.entries(stats.departmentStats).map(([department, count]) => (
              <div key={department} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">{department}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(count / stats.totalEmployees) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 