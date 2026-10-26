import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import axios from 'axios';
import App from './App';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

test('debounces requests and renders results in response order', async () => {
  vi.useFakeTimers();
  let resolveRequest;
  const getMock = vi.spyOn(axios, 'get').mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
  );

  render(<App onSelectItem={vi.fn()} />);
  const input = screen.getByRole('textbox');

  fireEvent.change(input, { target: { value: 'q' } });
  expect(input.parentElement.className).not.toContain('is-loading');
  expect(getMock).not.toHaveBeenCalled();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(100);
  });
  fireEvent.change(input, { target: { value: 'qu' } });

  await act(async () => {
    await vi.advanceTimersByTimeAsync(450);
  });
  expect(getMock).not.toHaveBeenCalled();
  expect(input.parentElement.className).not.toContain('is-loading');

  await act(async () => {
    await vi.advanceTimersByTimeAsync(50);
  });

  expect(getMock).toHaveBeenCalledTimes(1);
  expect(input.parentElement.className).toContain('is-loading');
  expect(getMock).toHaveBeenCalledWith('https://example.com/api/items', {
    params: { q: 'qu' },
  });

  await act(async () => {
    resolveRequest({ data: ['Italy', 'Spain', 'Portugal'] });
  });

  expect(input.parentElement.className).toContain('is-loading');
  expect(screen.queryByText('Italy')).toBeNull();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(100);
  });

  expect(screen.getByText('Italy')).toBeDefined();
  expect(input.parentElement.className).toBe('control');
  expect(Array.from(document.querySelectorAll('.list-item')).map((item) => item.textContent)).toEqual([
    'Italy',
    'Spain',
    'Portugal',
  ]);
});

test('calls onSelectItem when a result is clicked without navigating', async () => {
  vi.useFakeTimers();
  vi.spyOn(axios, 'get').mockResolvedValue({ data: ['Italy'] });
  const onSelectItem = vi.fn();
  render(<App onSelectItem={onSelectItem} />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'it' } });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(500);
  });

  expect(screen.getByRole('textbox').parentElement.className).toContain('is-loading');
  await act(async () => {
    await vi.advanceTimersByTimeAsync(100);
  });

  const result = screen.getByText('Italy');
  fireEvent.click(result);
  expect(onSelectItem).toHaveBeenCalledExactlyOnceWith('Italy');
});

test('does not render an empty results list or request an empty query', () => {
  const getMock = vi.spyOn(axios, 'get');
  const { container } = render(<App onSelectItem={vi.fn()} />);

  expect(container.querySelector('.list')).toBeNull();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
  expect(container.querySelector('.list')).toBeNull();
  expect(getMock).not.toHaveBeenCalled();
});

test('does not render a list when the API returns no items', async () => {
  vi.useFakeTimers();
  vi.spyOn(axios, 'get').mockResolvedValue({ data: [] });
  const { container } = render(<App onSelectItem={vi.fn()} />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'none' } });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(500);
  });

  expect(container.querySelector('.list')).toBeNull();
});
