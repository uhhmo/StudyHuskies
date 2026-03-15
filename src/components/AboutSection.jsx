import React from 'react';
import { Link } from 'react-router';
import huskyIcon from '../assets/icon.png';

function AboutSection({currentUser}) {
    return (
        <main className="about-image p-5 container-fluid vh-100 p-0">
            <section className="mb-5 p-4 border rounded shadow-sm text-center bg-light">
                <div className="text-center row">
                    <img src={huskyIcon} alt="Husky Icon" className="rounded-circle mb-5 shadow-sm husky-image" />
                    <div>
                    </div>
                    <h2>About Us</h2>
                    <p>We hope to provide an interactive tool where students such as you, can view and create
                        flashcards, as well as
                        take gamified quizzes based
                        on your created materials. As current students, we understand the importance of study tools and
                        are excited to study with you.</p>
                    <p>We are a small team of about 4 UW students taking INFO 340, a web development class.</p>
                    <p>Bear with us through the development process! Excited to have you along!</p>
                </div>
            </section>

            <div class="text-center">
                <Link to={currentUser ? ('/courses') : ('/signIn')} className="btn-home">Get Started</Link>
            </div>

        </main>
    );
}

export default AboutSection;
