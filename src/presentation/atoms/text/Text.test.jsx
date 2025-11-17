import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LargeText, ParagraphText, SmallText, XSmallText } from "./Text";
import styles from "./Text.module.css";
import PropTypes from "prop-types";

describe("Text Components", () => {
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

  // LargeText Component
  describe("LargeText", () => {
    it("should render with children", () => {
      render(<LargeText>Large content</LargeText>);
      const textElement = screen.getByText("Large content");
      expect(textElement).toBeInTheDocument();
      expect(textElement.tagName).toBe("P");
      expect(textElement).toHaveClass(styles.text);
      expect(textElement).toHaveClass(styles.large);
    });

    it("should warn when missing children", () => {
      PropTypes.checkPropTypes(
        LargeText.propTypes,
        { children: undefined },
        "prop",
        "LargeText",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `children` is marked as required in `LargeText`",
        ),
      );
    });
  });

  // ParagraphText Component
  describe("ParagraphText", () => {
    it("should render with children", () => {
      render(<ParagraphText>Paragraph content</ParagraphText>);
      const textElement = screen.getByText("Paragraph content");
      expect(textElement).toBeInTheDocument();
      expect(textElement.tagName).toBe("P");
      expect(textElement).toHaveClass(styles.text);
      expect(textElement).toHaveClass(styles.paragraph);
    });

    it("should warn when missing children", () => {
      PropTypes.checkPropTypes(
        ParagraphText.propTypes,
        { children: undefined },
        "prop",
        "ParagraphText",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `children` is marked as required in `ParagraphText`",
        ),
      );
    });
  });

  // SmallText Component
  describe("SmallText", () => {
    it("should render with children (no extra class)", () => {
      render(<SmallText>Small content</SmallText>);
      const textElement = screen.getByText("Small content");
      expect(textElement).toBeInTheDocument();
      expect(textElement.tagName).toBe("P");
      expect(textElement).toHaveClass(styles.text);
      expect(textElement).toHaveClass(styles.small);
      expect(textElement).not.toHaveClass("extra-class");
    });

    it("should render with children + custom className", () => {
      render(<SmallText className="extra-class">Small content</SmallText>);
      const textElement = screen.getByText("Small content");
      expect(textElement).toBeInTheDocument();
      expect(textElement.tagName).toBe("P");
      expect(textElement).toHaveClass(styles.text);
      expect(textElement).toHaveClass(styles.small);
      expect(textElement).toHaveClass("extra-class");
    });

    it("should warn when missing children", () => {
      PropTypes.checkPropTypes(
        SmallText.propTypes,
        { children: undefined },
        "prop",
        "SmallText",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `children` is marked as required in `SmallText`",
        ),
      );
    });
  });

  // XSmallText Component
  describe("XSmallText", () => {
    it("should render with children", () => {
      render(<XSmallText>Extra small content</XSmallText>);
      const textElement = screen.getByText("Extra small content");
      expect(textElement).toBeInTheDocument();
      expect(textElement.tagName).toBe("P");
      expect(textElement).toHaveClass(styles.text);
      expect(textElement).toHaveClass(styles.xSmall);
    });

    it("should warn when missing children", () => {
      PropTypes.checkPropTypes(
        XSmallText.propTypes,
        { children: undefined },
        "prop",
        "XSmallText",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `children` is marked as required in `XSmallText`",
        ),
      );
    });
  });
});
