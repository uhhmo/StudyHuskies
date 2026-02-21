// ============================================================
// quiz.jsx
// ============================================================
import React from 'react';
import ProgressBar from '../components/ProgressBar';
import QuizReview from '../components/QuizReview';
import QuizStats from '../components/QuizStats';
import wizard from '../assets/wizard.png';
import QuizMode from '../components/QuizMode';


function quiz() {
  return (    <main class="container my-5">

        <section class="mb-5 p-4 border rounded shadow-sm text-center">
            <h1>Adventure Quiz</h1>
            <p>Test your knowledge on an adventure! Expore with interactive flashcards, but be careful,
                get a question wrong and you'll be sent back to the checkpoint!.</p>
        </section>

      <QuizMode/>

        <section class="mb-5 p-4 border rounded shadow-sm">
            <h2>Adventure!</h2>
            
            <QuizStats/>

            <div class="mb-4">
                <p class="fs-5">
                    The _____ Object Model allows JavaScript to interact with HTML documents.
                </p>

                <input type="text" class="form-control mb-3" placeholder="Type your answer here"/>
            </div>

            <button type="button" class="btn btn-home">Submit Answer</button>
        </section>

        <div class="container text-center p-4">
            <div class="row">
                <div class="col-2">
                    <img src={wizard} class="wizard" alt="The adventurer"/>
                </div>
            </div>

            <ProgressBar/>

            <div class="row mt-2">
                <div class="col">
                    Start
                </div>
                <div class="col">
                    Checkpoint A
                </div>
                <div class="col">
                    Checkpoint B
                </div>
                <div class="col">
                    Goal!
                </div>
            </div>
        </div>

        <QuizReview/>

    </main>)
}

export default quiz;