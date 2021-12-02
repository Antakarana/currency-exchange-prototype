import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboBox } from '../combobox';

afterAll(cleanup);

describe('combobox', () => {
    it('should render combobox', () => {
        render(<ComboBox data={[{ value: 'EUR', text: 'EUR' }, { value: 'USD', text: 'USD' }]} />);
        const comboboxElement = screen.getByRole('combobox');
        expect(comboboxElement).toBeInTheDocument();
        expect(screen.getAllByRole('option').length).toBe(2);
    });
    it('should render and allow user can change combobox item', () => {
        render(<ComboBox data={[{ value: 'EUR', text: 'EUR' }, { value: 'USD', text: 'USD' }, { value: 'GBP', text: 'GBP' }]} />);
        userEvent.selectOptions(
            screen.getByRole('combobox'),
            screen.getByRole('option', { name: 'EUR' }),
        )
        expect(screen.getByRole('option', { name: 'EUR' })).toBeInTheDocument();
    });
});