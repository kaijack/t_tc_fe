# 📚 Books Dashboard Frontend

A modern, responsive book management dashboard built with React, TypeScript, and Tailwind CSS. This frontend application provides a complete user interface for managing books, designed to work seamlessly with the Go backend service.

## 🚀 Features

- **Modern Dashboard**: Clean, intuitive interface for book management
- **Full CRUD Operations**: Create, read, update, and delete book entries
- **Modal-Based Forms**: Streamlined user experience with modal dialogs
- **Real-time Validation**: Client-side form validation with instant feedback
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Global State Management**: Efficient state handling with React Context API
- **Dynamic Routing**: Individual book detail pages with unique URLs
- **Error Handling**: User-friendly error messages and network failure handling

## 🛠️ Tech Stack

- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **React Context API** for state management
- **React Router** for client-side routing

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **Package Manager**: npm or yarn

### Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── BookCard.tsx   # Individual book display component
│   ├── BookForm.tsx   # Create/edit book form
│   ├── Modal.tsx      # Reusable modal component
│   └── ...
├── context/           # React Context providers
│   └── BookContext.tsx
├── hooks/             # Custom React hooks
│   ├── useBooks.ts    # Book data management
│   └── useApi.ts      # API request utilities
├── pages/             # Main page components
│   ├── Dashboard.tsx  # Main dashboard view
│   ├── BookDetail.tsx # Individual book details
│   └── NotFound.tsx   # 404 error page
├── services/          # API integration
│   └── api.ts         # Backend communication utilities
├── types/             # TypeScript type definitions
│   └── book.ts        # Book model interfaces
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
├── index.css          # Global styles & Tailwind imports
└── vite.config.ts     # Vite configuration
```

## ⚙️ Configuration

### API Configuration

Update the backend API URL in `src/services/api.ts`:

```typescript
// src/services/api.ts
export const API_BASE_URL = "http://localhost:8080";
```

For production deployment, you might want to use environment variables:

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reloading |
| `npm run build` | Create production build in `dist/` folder |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run type-check` | Run TypeScript type checking |

## 🔌 API Integration

The application communicates with the backend through these main API functions:

```typescript
// Core API functions in src/services/api.ts
fetchBooks()           // Get all books
createBook(book)       // Add new book
getBookById(id)        // Get specific book
updateBook(id, book)   // Update existing book
deleteBook(id)         // Remove book
```

### Example API Usage

```typescript
import { fetchBooks, createBook } from '../services/api';

// Fetch all books
const books = await fetchBooks();

// Create a new book
const newBook = await createBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  year: 1925
});
```

## 🛡️ Validation & Error Handling

### Form Validation
- **Real-time validation**: Instant feedback as users type
- **Required field checking**: Ensures all necessary fields are filled
- **Data type validation**: Validates years, formats, etc.
- **Visual feedback**: Clear error states and success indicators

### Error Handling
- **Network errors**: Graceful handling of connection issues
- **API errors**: User-friendly messages for server errors
- **Validation errors**: Clear indication of form problems
- **Loading states**: Visual feedback during API calls

## 🎨 Styling & Design

### Tailwind CSS
The application uses Tailwind CSS for consistent, responsive styling:

```css
/* Example component styling */
.book-card {
  @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow;
}

.button-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
```

### Responsive Design
- **Mobile-first approach**: Optimized for small screens first
- **Breakpoint system**: Tailwind's responsive utilities
- **Flexible layouts**: Grid and flexbox for adaptable designs

## 🧪 Testing

While tests aren't included by default, you can easily add them:

```bash
# Add testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom

# Run tests
npm run test
```

### Recommended Testing Setup
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **MSW**: Mock API responses for testing

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deployment Options

**Static Hosting Platforms:**
- **Vercel**: Zero-config deployment
- **Netlify**: Easy continuous deployment
- **GitHub Pages**: Free hosting for public repos
- **AWS S3 + CloudFront**: Scalable cloud hosting

**Example Vercel Deployment:**
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables

For production deployments, set these environment variables:

```env
VITE_API_URL=https://your-backend-api.com
VITE_APP_TITLE=Books Dashboard
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Commit changes**: `git commit -m 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Open a Pull Request**

### Code Style
- Use TypeScript for all new components
- Follow existing naming conventions
- Add proper type definitions
- Include JSDoc comments for complex functions

## 📄 License

[Add your license information here]

## 🔗 Related Links

- [Backend Repository](https://github.com/kaijack/t_fc_be/tree/dev)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)