import { create } from 'zustand'

interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
  performanceRating: number
  image: string
  role?: string
  isPromoted?: boolean
  promotedAt?: string
  previousRating?: number
}

interface Store {
  employees: Employee[]
  bookmarkedEmployees: number[]
  searchQuery: string
  setEmployees: (employees: Employee[]) => void
  toggleBookmark: (employeeId: number) => void
  setSearchQuery: (query: string) => void
  togglePromotion: (employeeId: number) => void
}

export const useStore = create<Store>((set) => ({
  employees: [],
  bookmarkedEmployees: [],
  searchQuery: '',
  
  setEmployees: (employees) => set({ employees }),
  
  toggleBookmark: (employeeId) =>
    set((state) => ({
      bookmarkedEmployees: state.bookmarkedEmployees.includes(employeeId)
        ? state.bookmarkedEmployees.filter((id) => id !== employeeId)
        : [...state.bookmarkedEmployees, employeeId],
    })),
    
  setSearchQuery: (query) => set({ searchQuery: query }),

  togglePromotion: (employeeId) =>
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === employeeId
          ? employee.isPromoted
            ? {
                ...employee,
                isPromoted: false,
                promotedAt: undefined,
                performanceRating: employee.previousRating || employee.performanceRating - 1,
                previousRating: undefined,
              }
            : {
                ...employee,
                isPromoted: true,
                promotedAt: new Date().toISOString(),
                previousRating: employee.performanceRating,
                performanceRating: Math.min(5, employee.performanceRating + 1),
              }
          : employee
      ),
    })),
})) 