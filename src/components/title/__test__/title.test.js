import { render, screen, cleanup } from '@testing-library/react';
import { Title } from '../../index';

afterAll(cleanup);

describe('title', () => {
    it('should render same text passed into text prop', async () => {
        render(<Title text="currency exchange prototype" />);
        const titleElement = screen.getByText(/currency exchange prototype/i);
        expect(titleElement).toBeInTheDocument();
    });
    it('should render, is title visible for users', async () => {
        render(<Title />);
        const inputElement = screen.getByTestId('title');
        expect(inputElement).toBeVisible();
    });
});