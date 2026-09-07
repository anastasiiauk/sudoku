import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from './useDocumentTitle';

afterEach(() => {
  document.title = '';
});

describe('useDocumentTitle', () => {
  it('should set document.title to the variant name on mount', () => {
    renderHook(() => useDocumentTitle('Killer Sudoku'));

    expect(document.title).toBe('Killer Sudoku');
  });

  it('should update document.title when the title argument changes', () => {
    const { rerender } = renderHook(({ title }: { title: string }) => useDocumentTitle(title), {
      initialProps: { title: 'Classic Sudoku' },
    });

    expect(document.title).toBe('Classic Sudoku');

    rerender({ title: 'Killer Sudoku' });

    expect(document.title).toBe('Killer Sudoku');
  });

  it('should reset document.title to "Sudoku" on unmount', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Arrow Sudoku'));

    expect(document.title).toBe('Arrow Sudoku');

    unmount();

    expect(document.title).toBe('Sudoku');
  });
});
