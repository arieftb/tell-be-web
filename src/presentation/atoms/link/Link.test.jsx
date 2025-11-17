import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Link from "./Link";
import styles from "./Link.module.css";
import PropTypes from "prop-types";

const renderWithRouter = (component, initialEntries = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
  );
};

describe("Link Component", () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe("Internal Links (RouterLink)", () => {
    it("should render internal link with correct props", () => {
      renderWithRouter(<Link to="/test">Test Link</Link>);

      const link = screen.getByRole("link", { name: "Test Link" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/test");
      expect(link).toHaveClass(styles.link);
      expect(link).not.toHaveAttribute("target");
    });

    it("should mark active link with aria-current", () => {
      renderWithRouter(<Link to="/current">Current Page</Link>, ["/current"]);

      const link = screen.getByRole("link", { name: "Current Page" });
      expect(link).toHaveAttribute("aria-current", "page");
    });

    it("should not mark inactive link with aria-current", () => {
      renderWithRouter(<Link to="/other">Other Page</Link>, ["/current"]);

      const link = screen.getByRole("link", { name: "Other Page" });
      expect(link).not.toHaveAttribute("aria-current");
    });

    it("should handle disabled internal link", () => {
      renderWithRouter(
        <Link to="/test" disabled>
          Disabled Link
        </Link>,
      );

      const link = screen.getByRole("link", { name: "Disabled Link" });
      expect(link).toHaveAttribute("href", "/");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveClass(styles.link, styles.disabled);
    });

    it("should call onClick handler for internal link", () => {
      const handleClick = vi.fn();
      renderWithRouter(
        <Link to="/test" onClick={handleClick}>
          Clickable Link
        </Link>,
      );

      const link = screen.getByRole("link", { name: "Clickable Link" });
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("should prevent onClick when disabled", () => {
      const handleClick = vi.fn();
      renderWithRouter(
        <Link to="/test" disabled onClick={handleClick}>
          Disabled Link
        </Link>,
      );

      const link = screen.getByRole("link", { name: "Disabled Link" });
      fireEvent.click(link);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("External Links (anchor tag)", () => {
    it("should render external link with correct props", () => {
      renderWithRouter(
        <Link to="https://example.com" external>
          External Link
        </Link>,
      );

      const link = screen.getByRole("link", { name: "External Link" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveClass(styles.link, styles.external);
    });

    it("should handle disabled external link", () => {
      renderWithRouter(
        <Link to="https://example.com" external disabled>
          Disabled External
        </Link>,
      );

      const link = screen.getByText("Disabled External");
      expect(link).not.toHaveAttribute("href");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveClass(styles.link, styles.disabled, styles.external);
    });

    it("should call onClick handler for external link", () => {
      const handleClick = vi.fn();
      renderWithRouter(
        <Link to="https://example.com" external onClick={handleClick}>
          External Link
        </Link>,
      );

      const link = screen.getByRole("link", { name: "External Link" });
      fireEvent.click(link);
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("should prevent onClick when external link is disabled", () => {
      const handleClick = vi.fn();
      renderWithRouter(
        <Link to="https://example.com" external disabled onClick={handleClick}>
          Disabled External
        </Link>,
      );

      const link = screen.getByText("Disabled External");
      fireEvent.click(link);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("PropTypes validation", () => {
    it("should warn when children prop is missing", () => {
      PropTypes.checkPropTypes(
        Link.propTypes,
        { to: "/test", children: undefined },
        "prop",
        "Link",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `children` is marked as required in `Link`",
        ),
      );
    });

    it("should warn when to prop is missing", () => {
      PropTypes.checkPropTypes(
        Link.propTypes,
        { children: "Test", to: undefined },
        "prop",
        "Link",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `to` is marked as required in `Link`",
        ),
      );
    });
  });

  describe("Additional props handling", () => {
    it("should pass through additional props to RouterLink", () => {
      renderWithRouter(
        <Link to="/test" data-testid="custom-link" className="extra-class">
          Test Link
        </Link>,
      );

      const link = screen.getByTestId("custom-link");
      expect(link).toHaveAttribute("data-testid", "custom-link");
      expect(link).toHaveClass("extra-class");
    });

    it("should pass through additional props to external link", () => {
      renderWithRouter(
        <Link
          to="https://example.com"
          external
          data-testid="external-link"
          className="extra-class"
        >
          External Link
        </Link>,
      );

      const link = screen.getByTestId("external-link");
      expect(link).toHaveAttribute("data-testid", "external-link");
      expect(link).toHaveClass("extra-class");
    });
  });
});
