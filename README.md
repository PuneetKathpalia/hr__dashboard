# HR Dashboard

A modern HR performance tracking dashboard built with Next.js, Tailwind CSS, and TypeScript.

## Features

- 📊 Employee performance tracking
- 🔍 Search and filter employees
- 📌 Bookmark management
- 📈 Department analytics
- 🌓 Dark/Light mode support
- 📱 Responsive design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Chart.js
- React Icons
- Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd hrdboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── bookmarks/         # Bookmarked employees
│   ├── analytics/         # Analytics dashboard
│   └── employee/          # Dynamic employee pages
├── components/            # Reusable components
│   ├── employees/         # Employee-related components
│   └── layout/           # Layout components
├── store/                # Zustand store
└── types/                # TypeScript types
```

## Features Explanation

### Dashboard Homepage
- Displays employee cards with basic information
- Performance rating visualization
- Quick actions (View, Bookmark, Promote)

### Search & Filter
- Real-time search functionality
- Filter by department
- Case-insensitive search

### Employee Details
- Comprehensive employee information
- Tabbed interface (Overview, Projects, Feedback)
- Performance history

### Bookmarks
- Save important employee profiles
- Quick access to bookmarked employees
- Remove from bookmarks

### Analytics
- Department-wise performance metrics
- Interactive charts
- Performance trends

## State Management

The application uses Zustand for state management with the following stores:
- Employee data
- Bookmark management
- Search/Filter state

## Styling

The project uses Tailwind CSS for styling with:
- Responsive design
- Dark/Light mode support
- Custom components
- Consistent spacing and colors

## Performance Optimization

- Client-side state management
- Optimized images
- Responsive design
- TypeScript for better development experience

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
