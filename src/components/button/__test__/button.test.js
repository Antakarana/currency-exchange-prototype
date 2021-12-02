import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Button, Input } from '../../index';

const mockedSetValue = jest.fn;

afterAll(cleanup);

describe('button', () => {
    it('should render and visible button element with text props', async () => {
        render(<Button text="Exchange" />);
        const buttonElement = screen.getByText(/Exchange/i);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeVisible();
    });
    it('should render and change input value by clicking button', async () => {
        render(
            <>
                <Input onChange={mockedSetValue} />
                <Button text={"Exchange"} />
            </>
        );
        const inputElement = screen.getByTestId('input').querySelector('input');
        const buttonElement = screen.getByRole('button', { name: /Exchange/i });
        fireEvent.click(buttonElement);
        fireEvent.change(inputElement, { target: { value: '20.5' } });
        expect(inputElement.value).toBe('20.5');
    });
});