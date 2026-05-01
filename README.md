## Demo

Live demo: https://museum-intelligence-dashboard-five.vercel.app


## Overview
Museum Explorer is a Single Page Application (SPA) built with React and TypeScript that allows users to browse, search, and explore artworks from a museum collection.

The application provides a gallery view for discovering artworks and a detailed view for examining individual pieces, including metadata such as artist, medium, dimensions, tags, and related works.

The project focuses on delivering a smooth and responsive user experience while efficiently handling large datasets and imperfect API data.

The application supports:
- Infinite scrolling gallery for efficient browsing of large collections
- Filtering by keyword, department, and date range
- Detailed artwork pages with extended metadata and related works
- Robust handling of missing or partial API data (e.g. missing images, unknown artists, incomplete dates)
- Loading states using skeleton UI for improved perceived performance

The project emphasizes clean component architecture, separation of concerns, and predictable data flow using React Query for server-state management.


## Key Technical Decisions

- **Limited Concurrency for Data Fetching**  
  Instead of fetching all artworks in parallel, I implemented a limited concurrency approach. This balances performance and API reliability by avoiding excessive parallel requests while still maintaining good responsiveness.

- **Infinite Scroll with Controlled Data Loading**  
  Infinite scrolling is used to provide a smooth browsing experience. To prevent excessive API usage, data is fetched in small chunks and rendered progressively.

- **Client-side Data Normalization**  
  Since the API returns inconsistent date formats, I implemented a normalization layer (`parseYear`) to enable reliable filtering and comparisons.

- **URL-driven Filters**  
  Filters are synchronized with URL query parameters, allowing deep linking, bookmarking, and state persistence across page reloads.


## Architecture
The application is built using a component-based architecture with a strong focus on reusability and separation of concerns. UI components are designed to be stateless where possible and receive data through props, which makes them predictable, easy to reuse across different views, and simple to refactor as the application scales.

The application follows a clear separation between server state (managed by React Query) and client state (UI interactions and filters), which keeps the data flow predictable and maintainable.

For server-state management, I used TanStack Query. It provides an efficient way to handle asynchronous data fetching, offering built-in caching, request deduplication, and automatic management of loading and error states. This significantly simplifies working with large datasets and improves the overall reliability and performance of data fetching logic.

To improve user experience during asynchronous operations, I implemented skeleton loading states instead of traditional text-based loaders. Skeletons provide a more consistent visual structure during data fetching, reduce perceived loading time, and give users a clear expectation of the content layout before the data is fully loaded.


## Performance Considerations

- Implemented request batching with limited concurrency to avoid API overload
- Used React Query caching to prevent unnecessary refetching
- Applied skeleton loading states to improve perceived performance
- Structured components to minimize unnecessary re-renders and keep rendering predictable


## Data Handling
The application integrates with a remote museum API and treats server data as the single source of truth. Data fetching is handled through React Query, which ensures consistent synchronization between the UI and server state while providing caching and automatic request management.

Special attention was given to handling incomplete or inconsistent API responses. Since artwork data may contain missing fields (such as artist, images, or tags), the UI is designed to degrade gracefully by providing fallback values (e.g. "Unknown Artist", "N/A") or conditional rendering for optional data.

A key part of the data handling logic is transformation before rendering. For example, date values are normalized using a custom parseYear utility to support filtering and comparison logic. This enables features such as year-based filtering and related artwork calculation, even when the original API data format is inconsistent.


## Testing
The testing strategy focuses on validating core application logic rather than full UI coverage. Tests were written using Vitest and React Testing Library.

The following areas were tested:
- Data transformation logic (e.g. parseYear and filtering functions)
- Component rendering logic under different states (data, empty, and fallback states)
- Conditional UI behavior such as handling missing data and empty collections

These tests were chosen to ensure the correctness of the most critical parts of the application: data processing and UI state transitions. Instead of testing implementation details, the focus was placed on verifying expected outputs and user-visible behavior.


## AI Usage
AI was used as a development assistant throughout the project to support both implementation and learning.

It helped with:
- Understanding and setting up a testing environment with Vitest and React Testing Library
- Clarifying how to structure unit tests for data transformation and component behavior
- Debugging TypeScript issues and improving type safety in data handling logic
- Supporting architectural decisions such as component structure and data fetching with React Query
- Improving UX decisions such as skeleton loading states and empty-state handling

AI was particularly helpful in learning how to approach testing for the first time. The final test implementation was written and adapted manually based on this guidance.

All architectural decisions and final implementation choices were made independently.