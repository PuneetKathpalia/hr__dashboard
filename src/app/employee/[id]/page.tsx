'use client'

import { useState } from 'react'
import { useStore } from '@/store/useStore'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useParams } from 'next/navigation'

type TabProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium text-sm rounded-md ${
      isActive
        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
    }`}
  >
    {label}
  </button>
)

// Mock data for projects and feedback
const MOCK_DATA = {
  projects: [
    { id: 1, name: 'Website Redesign', status: 'Completed', date: '2024-01-15' },
    { id: 2, name: 'Mobile App Development', status: 'In Progress', date: '2024-02-01' },
    { id: 3, name: 'Data Migration', status: 'Planned', date: '2024-03-01' },
  ],
  feedback: [
    { id: 1, date: '2024-02-15', rating: 5, comment: 'Excellent team player and problem solver.' },
    { id: 2, date: '2024-01-15', rating: 4, comment: 'Consistently delivers high-quality work.' },
    { id: 3, date: '2023-12-15', rating: 5, comment: 'Great leadership skills and initiative.' },
  ]
}

export default function TeamMemberPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { team } = useStore()
  const params = useParams()
  
  // Get member ID from URL
  const memberId = typeof params?.id === 'string' ? parseInt(params.id) : null
  const member = memberId ? team.find(m => m.id === memberId) : null

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Team member not found</p>
      </div>
    )
  }

  // Tab content renderers
  const renderOverviewTab = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Overview
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</h3>
          <p className="mt-1 text-gray-900 dark:text-white">{member.dept}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Performance Rating</h3>
          <p className="mt-1 text-gray-900 dark:text-white">{member.rating} / 5</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h3>
          <p className="mt-1 text-gray-900 dark:text-white">{member.email}</p>
        </div>
      </div>
    </div>
  )

  const renderProjectsTab = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {MOCK_DATA.projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{project.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{project.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{project.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderFeedbackTab = () => (
    <div className="space-y-4">
      {MOCK_DATA.feedback.map((feedback) => (
        <div key={feedback.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < feedback.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{feedback.date}</span>
          </div>
          <p className="text-gray-900 dark:text-white">{feedback.comment}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      {/* Member Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <Image
              src={member.pic}
              alt={`${member.firstName} ${member.lastName}`}
              width={96}
              height={96}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {member.firstName} {member.lastName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">{member.email}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {member.dept}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < member.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <Tab label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <Tab label="Projects" isActive={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
            <Tab label="Feedback" isActive={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'projects' && renderProjectsTab()}
        {activeTab === 'feedback' && renderFeedbackTab()}
      </div>
    </div>
  )
} 