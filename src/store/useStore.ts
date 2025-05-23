import { create } from 'zustand'

// Basic employee info
type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  dept: string  // shorter name for department
  rating: number  // shorter name for performanceRating
  pic: string    // shorter name for image
  role?: string
  promoted?: boolean  // simpler name than isPromoted
  promoDate?: string // shorter name for promotedAt
  oldRating?: number // simpler name for previousRating
}

// Our main store
type AppStore = {
  team: Employee[]  // simpler name than employees
  favorites: number[]  // more natural name than bookmarkedEmployees
  search: string    // simpler name than searchQuery
  
  // Actions
  updateTeam: (team: Employee[]) => void
  toggleFavorite: (id: number) => void
  updateSearch: (text: string) => void
  handlePromotion: (id: number) => void
}

export const useStore = create<AppStore>((set) => ({
  team: [],
  favorites: [],
  search: '',
  
  updateTeam: (team) => set({ team }),
  
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter(memberId => memberId !== id)
        : [...state.favorites, id],
    })),
    
  updateSearch: (text) => set({ search: text }),

  handlePromotion: (id) =>
    set((state) => ({
      team: state.team.map((member) =>
        member.id === id
          ? member.promoted
            ? {
                ...member,
                promoted: false,
                promoDate: undefined,
                rating: member.oldRating || member.rating - 1,
                oldRating: undefined,
              }
            : {
                ...member,
                promoted: true,
                promoDate: new Date().toISOString(),
                oldRating: member.rating,
                rating: Math.min(5, member.rating + 1),
              }
          : member
      ),
    })),
})) 