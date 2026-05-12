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

### Overview
This report analyzes the code-level architecture of Study Huskies, a React-based web application developed as a group final project for INFO 340. Study Huskies allows UW students to create courses, build flashcard sets, study cards interactively, take a gamified adventure-style quiz, and review cards they have consistently missed. The codebase is written in JavaScript using React, React Router, Firebase Realtime Database, and Firebase Authentication, and is bundled with Vite.
The report covers four sections: a code structure analysis of the system's architectural elements and process flows, an architecture assessment identifying structural deficiencies in the Flashcards component, a unit test suite verifying the behavior of that component, and a refactoring section documenting how each deficiency was addressed in code.

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

### Process Flows
This section describes how information moves through the codebase during the three most important interactions in Study Huskies, described at the level of which components render, which state changes, and which functions are called.

#### App initialization and data loading

When the app first loads, App renders with empty courses and missedCards arrays and loading set to true. A useEffect immediately attaches an onAuthStateChanged listener to Firebase Auth. If no user is signed in, currentUser stays null, loading becomes false, and the router renders — protected routes redirect to /signin.

Once a user is authenticated, onAuthStateChanged fires with the Firebase user object and sets currentUser. This triggers a second useEffect which attaches an onValue listener to users/{uid}/courses. When the snapshot arrives, App normalizes the data and calls setCourses. A parallel useEffect does the same for users/{uid}/missedCards. Once both snapshots have arrived, loading becomes false and the full app renders.

#### Adding or editing a card in Flashcards

When a user saves a card in Flashcards, the component calls setSets(newSets) — a callback prop from App. App.setSets merges the updated flat array back into the nested courses structure by matching on set.id, then calls saveCourses(), which calls Firebase set() to overwrite the courses node. The onValue listener fires in response, updating courses state in App, which re-renders Flashcards with the updated card visible.

#### Quiz session
A user navigates to /Quiz, which renders QuizMode. After selecting a set and number of lives, QuizMode calls props.setLives() to update App state, then calls navigate(/quiz/:setId). React Router renders QuizActive, which enters a gameplay loop tracking correct answers, lives, and missed cards. On completion, QuizActive calls navigate(/quiz/:setId/results, { state: scoreData }). React Router renders QuizReview, which reads the score from useLocation().state and displays the results.

### Figure 2. Flashcard DataFlow Diagram
Figure 2 highlights the key architectural feature of the Flashcards flow: all three mutation operations — add, edit, and delete — share the same write path back through App to Firebase. No data ever bypasses App on the way to the database.


## Architecture Assessment
### Selected Element : Flashcards.jsx
This component was chosen because it contains four distinct functions (addCard, deleteCard, startEditCard, saveCard) plus significant state management and JSX rendering logic, making it large enough to exhibit multiple deficiencies across all four assessment lenses. It is also the element covered by the unit test suite and the refactoring work.

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
   ##### Fix - Rename Field 
    Would map q & a to question & answer (cannot explicitly rename q and a due to them being declared like this in Firebase, which changing could affect the entire codebase)
   ```javascript
    setEditCard({ question: card.q, answer: card.a });
   ``` 

## Unit Tests
 
### Selected element and rationale
 
The unit tests target the `Flashcards` component (`src/pages/flashcards.jsx`). This component was chosen because it contains four distinct interactive functions (`addCard`, `deleteCard`, `startEditCard`, `saveCard`) plus multiple rendering branches (empty state, card display, add form, edit form), giving a wide range of behaviors to test. The tests verify both the happy paths (normal add/edit/delete, switching sets) and the unhappy paths (saving with blank inputs, canceling forms).
 
### Testing framework and setup
 
Tests are implemented using **Vitest** with **React Testing Library**. Vitest integrates with the project's Vite build pipeline. React Testing Library provides `render`, `screen`, and `fireEvent` for mounting components and simulating user interactions.
 
The test environment is configured in `vite.config.js`:
 
```js
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.js',
}
```
 
The setup file (`src/test/setup.js`) imports jest-dom matchers for Vitest and registers a global `cleanup` after each test:
 
```js
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
 
afterEach(() => {
  cleanup();
});
```
 
### How to run the tests
 
**Required dev dependencies:**
 
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/dom jsdom --legacy-peer-deps
```
 
**Run the suite:**
 
```bash
npm test
```
 
**Run with coverage:**
 
```bash
npm run test:coverage
```
