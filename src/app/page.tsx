'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import EmployeeCard from '@/components/employees/EmployeeCard'

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design']

async function fetchEmployees() {
  const response = await fetch('https://dummyjson.com/users?limit=20')
  const data = await response.json()
  
  return data.users.map((user: any) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    department: departments[Math.floor(Math.random() * departments.length)],
    performanceRating: Math.floor(Math.random() * 5) + 1,
    image: user.image,
  }))
}

export default function Home() {
  const { employees, setEmployees, searchQuery } = useStore()

  useEffect(() => {
    const loadEmployees = async () => {
      const employeeData = await fetchEmployees()
      setEmployees(employeeData)
    }
    loadEmployees()
  }, [setEmployees])

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.department.toLowerCase().includes(searchTerm)
    )
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Employee Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track employee performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  )
}
