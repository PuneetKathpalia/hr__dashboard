import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import Image from 'next/image'

interface EmployeeCardProps {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
  performanceRating: number
  image: string
  isPromoted?: boolean
  promotedAt?: string
}

export default function EmployeeCard({
  id,
  firstName,
  lastName,
  email,
  department,
  performanceRating,
  image,
  isPromoted,
  promotedAt,
}: EmployeeCardProps) {
  const { bookmarkedEmployees, toggleBookmark, togglePromotion } = useStore()
  const isBookmarked = bookmarkedEmployees.includes(id)

  const handlePromotionToggle = () => {
    togglePromotion(id)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={image}
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
                {department}
              </span>
              {isPromoted && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Promoted
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => toggleBookmark(id)}
          className="text-gray-400 hover:text-yellow-500 transition-colors"
        >
          {isBookmarked ? (
            <StarIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <StarOutlineIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`h-5 w-5 ${
                  index < performanceRating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            Performance Rating
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-3">
        <Link
          href={`/employee/${id}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Profile
        </Link>
        <button
          onClick={handlePromotionToggle}
          className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isPromoted
              ? 'border-orange-500 text-orange-700 bg-orange-50 hover:bg-orange-100 dark:border-orange-600 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/40 focus:ring-orange-500'
              : 'border-green-500 text-green-700 bg-green-50 hover:bg-green-100 dark:border-green-600 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 focus:ring-green-500'
          }`}
        >
          {isPromoted ? 'Unpromote' : 'Promote'}
        </button>
      </div>

      {isPromoted && promotedAt && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Promoted on {new Date(promotedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  )
} 