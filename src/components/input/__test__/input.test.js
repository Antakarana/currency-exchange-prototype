import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Button } from '../../button/button';
import { Input } from '../../index';

const mockedSetValue = jest.fn;

afterAll(cleanup);

describe('input', () => {
    it('should render, if there is exceed balance, visible it', async () => {
        render(<Input isThereError={true} />);
        const inputElement = screen.getByText(/Exceeds balance/i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toBeVisible();
    });
    it('should render, visible and check truthy (not equal NaN, undefined, false, "", 0)', async () => {
        render(<Input />);
        const inputElement = screen.getByTestId('input');
        expect(inputElement).toBeTruthy();
        expect(inputElement).toBeVisible();
    });
    it('should render and check input html element', async () => {
        render(<Input />);
        const inputElement = screen.getByTestId('input');
        expect(inputElement).toContainHTML('input')
    });
    it('should render, click button and change input value', async () => {
        render(
            <>
                <Input onChange={mockedSetValue} />
                <Button text={"Exchange"} />
            </>
        );
        const inputElement = screen.getByTestId('input').querySelector('input');
        const buttonElement = screen.getByRole('button', { name: /Exchange/i });
        fireEvent.click(buttonElement);
        fireEvent.change(inputElement, { target: { value: '20' } });
        expect(inputElement.value).toBe('20');
    });
});