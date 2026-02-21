import React from 'react';

function QuizMode() {
    return (

        <section class="mb-5 p-4 border rounded shadow-sm">
            <h2>Select Adventure Mode</h2>

            <form>
                <div class="mb-4">
                    <label for="flashcardSet" class="form-label">Select Flashcard Set</label>
                    <select class="form-select" id="flashcardSet">
                        <option selected>Chose a set</option>
                    </select>
                </div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="quizMode" id="recallMode" />
                    <label class="form-check-label" for="recallMode">
                        <strong>Recall Mode</strong> - Fill in missing words from flashcard definitions
                    </label>
                </div>

                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="quizMode" id="speedMode" />
                    <label class="form-check-label" for="speedMode">
                        <strong>Speed Mode</strong> - Multiple choice questions under time pressure
                    </label>
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" type="radio" name="quizMode" id="mixedMode" />
                    <label class="form-check-label" for="mixedMode">
                        <strong>Mixed Mode</strong> - Combination of recall and multiple choice
                    </label>
                </div>

                <div class="mb-4">
                    <label for="livesCount" class="form-label">Number of Lives</label>
                    <input type="number" class="form-control" id="livesCount" />
                    <div class="form-text">How many mistakes are allowed?</div>
                </div>

                <button type="button" class="btn btn-home">Start Quiz</button>
            </form>
        </section>
    )
}

export default QuizMode;