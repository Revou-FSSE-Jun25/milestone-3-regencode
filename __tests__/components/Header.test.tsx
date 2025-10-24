import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Header from '../../app/components/Header'
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe('header tests', () => {
    let push: jest.Mock;

    beforeEach(() => {
        push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });
    });

    it("renders main title and homepage link", () => {
        render(<Header />);
        const homeLink = screen.getByRole("link", { name: /revoshop/i });
        expect(homeLink).toHaveAttribute("href", "/");
    });

    it("render nav buttons", () => {
        render(<Header toggleCartModal={jest.fn()}/>);

        expect(screen.getByRole("link", { name: /faq-button/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cart-button/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login-button/i })).toBeInTheDocument();
    });

    it("does not render cart button when toggleCartModal is undefined", () => { render(<Header />);
        const cartButton = screen.queryByRole("button", { name: /cart-button/i });
        expect(cartButton).not.toBeInTheDocument();

    });
    test("renders and triggers cart button when toggleCartModal is provided", () => {
        const toggleCartModal = jest.fn();
        render(<Header toggleCartModal={toggleCartModal} />);

        const cartButton = screen.getByRole("button", { name: /cart-button/i });
        expect(cartButton).toBeInTheDocument();

        fireEvent.click(cartButton);
        expect(toggleCartModal).toHaveBeenCalledTimes(1);
    });
    it("redirects to login page when login button is clicked", () => {
        render(<Header />);
        const loginButton = screen.getByRole("button", { name: /login-button/i });

        fireEvent.click(loginButton);
        expect(push).toHaveBeenCalledWith("/login/");
    });
});
