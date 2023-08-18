import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { KanbanBoard } from '../common/KanbanBoard/KanbanBoard';
import { LinkInput } from '../common/LinkInput/LinkInput';

interface Props {
  children: ReactNode;
}

const AllProviders = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);

describe('KanbanBoard', () => {
  it('renders KanbanBoard component', () => {
    render(<KanbanBoard />, { wrapper: AllProviders });
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});

describe('LinkInput', () => {
  it('renders LinkInput component', () => {
    render(<LinkInput />, { wrapper: AllProviders });
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.tab();
    expect(input).toHaveFocus();
    userEvent.tab();

    userEvent.click(input);
    expect(input).toHaveFocus();

    expect(screen.getByText('Load issues')).toBeInTheDocument();
  });
});
