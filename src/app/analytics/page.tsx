'use client'

import { useStore } from '@/store/useStore'

export default function AnalyticsPage() {
  const { team } = useStore()

  // Calculate statistics
  const stats = {
    totalMembers: team.length,
    promotedMembers: team.filter(member => member.promoted).length,
    averageRating: team.length
      ? (team.reduce((sum, member) => sum + member.rating, 0) / team.length).toFixed(1)
      : 0,
    deptStats: team.reduce((acc, member) => {
      acc[member.dept] = (acc[member.dept] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Team Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of team performance and statistics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Team Size</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.totalMembers}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recently Promoted</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">{stats.promotedMembers}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Average Rating</h3>
          <p className="mt-2 text-3xl font-semibold text-yellow-600">{stats.averageRating}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Promotion Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-purple-600">
            {stats.totalMembers ? Math.round((stats.promotedMembers / stats.totalMembers) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Department Distribution</h3>
          <div className="space-y-4">
            {Object.entries(stats.deptStats).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">{dept}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(count / stats.totalMembers) * 100}%`,
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