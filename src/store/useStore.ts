import { create } from 'zustand'

type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  dept: string  
  rating: number  
  pic: string   
  role?: string
  promoted?: boolean  
  promoDate?: string 
  oldRating?: number 
}

type AppStore = {
  team: Employee[]  
  favorites: number[]  
  search: string    
  theme: 'light' | 'dark'

  updateTeam: (team: Employee[]) => void
  toggleFavorite: (id: number) => void
  updateSearch: (text: string) => void
  handlePromotion: (id: number) => void
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useStore = create<AppStore>((set) => ({
  team: [],
  favorites: [],
  search: '',
  theme: 'light',
  
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

  toggleTheme: () => 
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.toggle('dark')
      return { theme: newTheme }
    }),

  setTheme: (theme) => 
    set(() => {
      localStorage.setItem('theme', theme)
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme }
    }),
})) 