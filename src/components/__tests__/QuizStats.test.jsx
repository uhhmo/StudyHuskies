import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import QuizStats, { formatTime } from '../QuizStats';

/*
  ============================
  Testing the helper function
  ============================
  formatTime takes a number of seconds
  and converts it into a MM:SS string.
*/
describe('formatTime', () => {
  it('formats seconds into MM:SS text', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(9)).toBe('00:09');
    expect(formatTime(61)).toBe('01:01');
    expect(formatTime(600)).toBe('10:00');
  });
});

/*
  ============================
  Testing the QuizStats UI
  ============================
  These tests check that the component
  correctly displays the props passed in.
*/
describe('QuizStats', () => {
  it('renders the quiz status values', () => {
    render(
      <QuizStats
        current={3}
        total={12}
        checkpoint={2}
        elapsedSeconds={125}
        lives={4}
      />
    );

    expect(screen.getByText('Question: 3 / 12')).toBeInTheDocument();
    expect(screen.getByText('Checkpoint: 2')).toBeInTheDocument();
    expect(screen.getByText('⏱ 02:05')).toBeInTheDocument();
    expect(screen.getByText('Lives: 4')).toBeInTheDocument();
  });

  it('defaults elapsed time to zero when no value is passed', () => {
    render(
      <QuizStats
        current={1}
        total={5}
        checkpoint={0}
        lives={1}
      />
    );

    expect(screen.getByText('⏱ 00:00')).toBeInTheDocument();
  });
});
