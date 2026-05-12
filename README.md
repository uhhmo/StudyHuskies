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
## Report


### Overview


### Code Structure Analysis
   ## Architectural Elements 

   ## Process Flow




### Architecture Assessment
   ## Code Deficiencies
   # Long Function - Entire Component
    The Flashcards.jsx component is way too long, making it difficult to test and modify the code
   # Data Clumps - (lines 14-15 and 17-18)
    Occurs in the state declarations - editQ and editA + newQ and newA are never used independently, making the extra state declarations redundant
   # Mysterious Names - (lines 10 - 68)
    Occurs in the state declarations and each of the present functions - question, answer, and set are all abbreviated to q, a, and s respectively, which hurts the overall readability of the codebase. 











## Unit Tests


This checkpoint includes unit tests for the `QuizStats` component in `src/components/QuizStats.jsx`.


What is covered:
Run the tests:


```bash
npm run test
```


Run the tests with coverage:


```bash
npm run test:coverage
```
### Refactoring
   ## Data Clumps Fix - Used Introduce Parameter Object Refactoring 
   Group each pair into a single state object
   ```javascript
    const [editCard, setEditCard] = useState({ q: '', a: '' });
    const [newCard, setNewCard] = useState({ q: '', a: '' });
   ```
   ## Mysterious Names Fix - 