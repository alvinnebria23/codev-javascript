import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Solution from './App.tsx';

const menuConfig = [
  { title: 'Home' },
  { title: 'Services', subItems: ['Cooking', 'Cleaning'] },
  { title: 'Contact', subItems: ['Phone', 'Mail'] },
];

function byTestId(container: HTMLElement, id: string) {
  return container.querySelector(`[data-test-id="${id}"]`);
}

test('renders configured menu items with the required test ids', () => {
  const { container } = render(<Solution menuConfig={menuConfig} />);

  expect(byTestId(container, 'first-level-home')?.textContent).toContain('Home');
  expect(byTestId(container, 'first-level-services')).not.toBeNull();
  expect(byTestId(container, 'button-services')?.textContent).toBe('Expand');
  expect(byTestId(container, 'ul-services')).toBeNull();
  expect(byTestId(container, 'button-home')).toBeNull();
});

test('renders the supplied default menu when no config prop is passed', () => {
  const { container } = render(<Solution />);

  expect(byTestId(container, 'first-level-home')?.textContent).toContain('Home');
  expect(byTestId(container, 'first-level-services')).not.toBeNull();
  expect(byTestId(container, 'first-level-contact')).not.toBeNull();
  expect(byTestId(container, 'button-services')?.textContent).toBe('Expand');
  expect(byTestId(container, 'button-contact')?.textContent).toBe('Expand');
});

test('expands and collapses a submenu, rendering its item test ids', () => {
  const { container } = render(<Solution menuConfig={menuConfig} />);
  const serviceButton = byTestId(container, 'button-services')!;

  fireEvent.click(serviceButton);
  expect(byTestId(container, 'ul-services')).not.toBeNull();
  expect(byTestId(container, 'li-services-cooking')?.textContent).toBe('Cooking');
  expect(byTestId(container, 'li-services-cleaning')?.textContent).toBe('Cleaning');
  expect(serviceButton.textContent).toBe('Hide');

  fireEvent.click(serviceButton);
  expect(byTestId(container, 'ul-services')).toBeNull();
  expect(serviceButton.textContent).toBe('Expand');
});

test('keeps only one submenu expanded at a time', () => {
  const { container } = render(<Solution menuConfig={menuConfig} />);

  fireEvent.click(byTestId(container, 'button-services')!);
  fireEvent.click(byTestId(container, 'button-contact')!);

  expect(byTestId(container, 'ul-services')).toBeNull();
  expect(byTestId(container, 'ul-contact')).not.toBeNull();
  expect(byTestId(container, 'li-contact-phone')?.textContent).toBe('Phone');
});

test('does not render a button or submenu for an empty subItems array', () => {
  const { container } = render(<Solution menuConfig={[{ title: 'Empty', subItems: [] }]} />);

  expect(byTestId(container, 'button-empty')).toBeNull();
  expect(byTestId(container, 'ul-empty')).toBeNull();
});
