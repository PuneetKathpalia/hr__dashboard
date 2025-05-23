'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import EmployeeCard from '@/components/employees/EmployeeCard'

// Team departments
const depts = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design']

// API response type
type ApiUser = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
}

type ApiResponse = {
  users: ApiUser[]
}

// Get team data from API
async function getTeamData() {
  const response = await fetch('https://dummyjson.com/users?limit=20')
  const data: ApiResponse = await response.json()
  
  return data.users.map((person) => ({
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
    email: person.email,
    dept: depts[Math.floor(Math.random() * depts.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    pic: person.image,
  }))
}

export default function Home() {
  const { team, updateTeam, search } = useStore()

  // Load team data on startup
  useEffect(() => {
    async function loadTeam() {
      const teamData = await getTeamData()
      updateTeam(teamData)
    }
    loadTeam()
  }, [updateTeam])

  // Filter team based on search
  const filteredTeam = team.filter((person) => {
    const searchText = search.toLowerCase()
    return (
      person.firstName.toLowerCase().includes(searchText) ||
      person.lastName.toLowerCase().includes(searchText) ||
      person.email.toLowerCase().includes(searchText) ||
      person.dept.toLowerCase().includes(searchText)
    )
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Team Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Keep track of your team's performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map((person) => (
          <EmployeeCard key={person.id} {...person} />
        ))}
      </div>
    </div>
  )
}
