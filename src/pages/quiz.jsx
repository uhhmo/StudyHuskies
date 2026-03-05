// ============================================================
// quiz.jsx
// ============================================================
import React from 'react';
import ProgressBar from '../components/ProgressBar';
import QuizReview from '../components/QuizReview';
import QuizStats from '../components/QuizStats';
import wizard from '../assets/wizard.png';
import QuizMode from '../components/QuizMode';
import { Outlet } from 'react-router';


function Quiz() {
    return (
        <main className="container my-5">

            <section className="mb-5 p-4 border rounded shadow-sm text-center">
                <h1>Adventure Quiz</h1>
                <p>Test your knowledge on an adventure! Expore with interactive flashcards, but be careful,
                    get a question wrong and you'll be sent back to the checkpoint!.</p>
            </section>

            <Outlet />
        </main>
        )
}

export default Quiz;