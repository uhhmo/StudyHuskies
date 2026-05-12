# StudyHuskies


StudyHuskies is a React and Vite app for organizing course flashcards and studying with an adventure-style quiz flow.


## Project Setup




Install dependencies:


```bash
npm install
```


Run the app locally:


```bash
npm run dev
```
## Software Architecture Report

### Code Structure Analysis

StudyHuskies is structured primarily around React components, using React Router for navigation and Firebase for persistence. The architectural elements are described at the React component level because the application is small enough that individual components represent meaningful units of behavior and responsibility.


## Architectural Elements 
| Element | Type | Purpose |
|---|---|---|
| App.jsx | Root component | Owns global application state and coordinates Firebase communication |
| Navbar | Presentational component | Displays navigation links and authentication controls |
| HomeSection | Page component | Renders the landing page and study feature overview |
| AboutSection | Presentational component | Displays project and application information |
| Flashcards | Page component | Manages flashcard creation, editing, and deletion |
| QuizMode | Page component | Configures quiz sessions and selected sets |
| QuizActive | Stateful page component | Controls quiz gameplay logic and progression |
| QuizReview | Page component | Displays final quiz statistics and missed cards |
| QuizStats | Presentational component | Displays quiz progress, checkpoints, timer, and lives |
| ProgressBar | Presentational component | Visualizes quiz progression |
| Footer | Presentational component | Displays footer information |
| Firebase Auth | External service | Handles authentication state |
| Firebase Realtime Database | External service | Stores course and flashcard data |
| React Router | External library | Manages client-side routing |

### Abstraction Level

The architecture is analyzed primarily at the React component level rather than the individual function level. This abstraction level is appropriate because components represent the major behavioral and structural units of the application. Analyzing smaller helper functions individually would be too granular, while analyzing only at the module level would hide important state-management relationships between components.

## Component Relationships and Dependencies

### State Ownership
App.jsx is the central hub of the dependency graph and acts as the global state owner. Shared application state, including courses, flashcard sets, authentication status, missed cards, and quiz lives, is stored and coordinated at this level.

### Data Flow
The application follows a unidirectional data flow architecture. State flows downward from App.jsx into child components through props, while state updates flow upward through callback props such as updateCourses, setSets, and saveMissedCards.

### Routing Dependencies
React Router coordinates transitions between route-level components. Most pages receive their required data through props from App.jsx. The primary exception is QuizReview.jsx, which receives quiz result data through location.state after navigation from QuizActive.jsx.

### Firebase Dependencies

App.jsx is the only component that communicates directly with Firebase. Firebase Authentication is used to monitor login state through onAuthStateChanged, while Firebase Realtime Database is accessed through onValue listeners and set() write operations.

### Flashcard State Transformation

The Flashcards.jsx component receives a flattened sets array derived from nested course data using the flattenSets utility function in App.jsx. When flashcards are modified, the updated flat structure is merged back into the nested course structure before being written to Firebase.


## Architecture Assessment
   ### Code Deficiencies
   ### Long Function - Entire Component
    The Flashcards.jsx component is way too long, making it difficult to test and modify the code
   ### Data Clumps - (lines 14-15 and 17-18)
    Occurs in the state declarations - editQ and editA + newQ and newA are never used independently, making the extra state declarations redundant

   ### Fix - Used Introduce Parameter Object Refactoring
    Grouped each pair into a single state object
   ```javascript
    const [editCard, setEditCard] = useState({ q: '', a: '' });
    const [newCard, setNewCard] = useState({ q: '', a: '' });
   ```
   ### Mysterious Names - (lines 10 - 68)
    Occurs in the state declarations and each of the present functions - question, answer, and set are all abbreviated to q, a, and s respectively, which hurts the overall readability of the codebase. 

## Unit Tests

This checkpoint includes unit tests for the `QuizStats` & `Flashcards` component in `src/components/QuizStats.jsx` & `src/components/__tests__/Flashcards.test.jsx`

What is covered:
Run the tests:

```bash
npm run test
```

Run the tests with coverage:

```bash
npm run test:coverage
```