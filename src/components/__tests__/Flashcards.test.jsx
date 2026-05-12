import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Flashcards from '../../pages/flashcards';

/*
  ============================
  Cleanup after each test
  ============================
*/
afterEach(() => {
  cleanup();
});

/*
  ============================
  Mock test data
  ============================
*/
const testSets = [
  {
    id: 1,
    name: 'Biology 101',
    cards: [
      { id: 10, q: 'What is a cell?', a: 'The basic unit of life' },
      { id: 11, q: 'What is DNA?',    a: 'Genetic material'       },
    ],
  },
  {
    id: 2,
    name: 'Math 120',
    cards: [
      { id: 20, q: 'What is pi?', a: '3.14159' },
    ],
  },
];

/*
  ============================
  Empty state tests
  ============================
*/
describe('Flashcards empty state', () => {
  it('shows a message when no sets exist', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={[]} setSets={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No flashcard sets yet/i)).toBeInTheDocument();
  });

  it('shows a Courses link', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={[]} setSets={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Courses/i })).toBeInTheDocument();
  });
});

/*
  ============================
  Rendering tests
  ============================
*/
describe('Flashcards rendering', () => {
  it('renders the heading', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Flashcards/i })).toBeInTheDocument();
  });

  it('renders all set names', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Biology 101')[0]).toBeInTheDocument();
    expect(screen.getByText('Math 120')).toBeInTheDocument();
  });

  it('shows the first flashcard by default', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText('What is a cell?')).toBeInTheDocument();
    expect(screen.getByText('The basic unit of life')).toBeInTheDocument();
  });

  it('switches sets when clicked', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Math 120'));
    expect(screen.getByText('What is pi?')).toBeInTheDocument();
    expect(screen.getByText('3.14159')).toBeInTheDocument();
  });

  it('shows empty state for sets with no cards', () => {
    const emptySet = [{ id: 99, name: 'Empty Set', cards: [] }];
    render(
      <MemoryRouter>
        <Flashcards sets={emptySet} setSets={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No cards yet/i)).toBeInTheDocument();
  });
});

/*
  ============================
  Add card tests
  ============================
*/
describe('Adding flashcards', () => {
  it('opens the add card form', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /\+ add card/i }));
    expect(screen.getByPlaceholderText('Type a question')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type an answer')).toBeInTheDocument();
  });

  it('saves a new flashcard', () => {
    const mockSetSets = vi.fn();
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={mockSetSets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ add card/i }));
    fireEvent.change(screen.getByPlaceholderText('Type a question'), {
      target: { value: 'What is mitosis?' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type an answer'), {
      target: { value: 'Cell division' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(mockSetSets).toHaveBeenCalledOnce();
    const updatedSets = mockSetSets.mock.calls[0][0];
    const updatedSet = updatedSets.find(s => s.id === 1);
    const newCard = updatedSet.cards.find(c => c.q === 'What is mitosis?');
    expect(newCard).toBeDefined();
    expect(newCard.a).toBe('Cell division');
  });

  it('does not save with blank question', () => {
    const mockSetSets = vi.fn();
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={mockSetSets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ add card/i }));
    fireEvent.change(screen.getByPlaceholderText('Type an answer'), {
      target: { value: 'Cell division' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(mockSetSets).not.toHaveBeenCalled();
  });

  it('does not save with blank answer', () => {
    const mockSetSets = vi.fn();
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={mockSetSets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ add card/i }));
    fireEvent.change(screen.getByPlaceholderText('Type a question'), {
      target: { value: 'What is mitosis?' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(mockSetSets).not.toHaveBeenCalled();
  });

  it('closes the add form on cancel', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /\+ add card/i }));
    fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));

    expect(screen.queryByPlaceholderText('Type a question')).not.toBeInTheDocument();
  });
});

/*
  ============================
  Delete card tests
  ============================
*/
describe('Deleting flashcards', () => {
  it('deletes a flashcard', () => {
    const mockSetSets = vi.fn();
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={mockSetSets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTitle('Delete card')[0]);

    expect(mockSetSets).toHaveBeenCalledOnce();
    const updatedSets = mockSetSets.mock.calls[0][0];
    const updatedSet = updatedSets.find(s => s.id === 1);
    expect(updatedSet.cards.find(c => c.id === 10)).toBeUndefined();
  });
});

/*
  ============================
  Edit card tests
  ============================
*/
describe('Editing flashcards', () => {
  it('opens edit form with existing values', () => {
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTitle('Edit card')[0]);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0].value).toBe('What is a cell?');
    expect(inputs[1].value).toBe('The basic unit of life');
  });

  it('saves edited flashcard text', () => {
    const mockSetSets = vi.fn();
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={mockSetSets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTitle('Edit card')[0]);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Updated question' } });
    fireEvent.change(inputs[1], { target: { value: 'Updated answer' } });
    fireEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(mockSetSets).toHaveBeenCalledOnce();
    const updatedSets = mockSetSets.mock.calls[0][0];
    const updatedCard = updatedSets
      .find(s => s.id === 1)
      .cards.find(c => c.id === 10);
    expect(updatedCard.q).toBe('Updated question');
    expect(updatedCard.a).toBe('Updated answer');
  });

  it('closes edit form without saving', () => {
    const mockSetSets = vi.fn();
    render(
      <MemoryRouter>
        <Flashcards sets={testSets} setSets={mockSetSets} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTitle('Edit card')[0]);
    fireEvent.click(screen.getByRole('button', { name: /^cancel$/i }));

    expect(mockSetSets).not.toHaveBeenCalled();
    expect(screen.queryByDisplayValue('What is a cell?')).not.toBeInTheDocument();
  });
});