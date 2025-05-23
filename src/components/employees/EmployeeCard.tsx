import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import Image from 'next/image'

type CardProps = {
  id: number
  firstName: string
  lastName: string
  email: string
  dept: string
  rating: number
  pic: string
  promoted?: boolean
  promoDate?: string
}

export default function EmployeeCard({
  id,
  firstName,
  lastName,
  email,
  dept,
  rating,
  pic,
  promoted,
  promoDate,
}: CardProps) {
  const { favorites, toggleFavorite, handlePromotion } = useStore()
  const isFavorite = favorites.includes(id)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={pic}
            alt={`${firstName} ${lastName}`}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {dept}
              </span>
              {promoted && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Promoted
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(id)}
          className="text-gray-400 hover:text-yellow-500 transition-colors"
        >
          {isFavorite ? (
            <StarIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <StarOutlineIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Performance
            </span>
          </div>
          <button
            onClick={() => handlePromotion(id)}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {promoted ? 'Undo Promotion' : 'Promote'}
          </button>
        </div>
      </div>
    </div>
  )
} 