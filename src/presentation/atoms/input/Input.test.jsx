import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Input from "./Input";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

describe("Input Component", () => {
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

  const defaultProps = {
    id: "test-input",
    name: "testInput",
    value: "",
    onChange: vi.fn(),
  };

  describe("Regular Input", () => {
    it("should render input with required props", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("id", "test-input");
      expect(input).toHaveAttribute("name", "testInput");
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveClass(styles.input);
    });

    it("should render input with custom type", () => {
      render(<Input {...defaultProps} type="email" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("should render input with placeholder", () => {
      render(<Input {...defaultProps} placeholder="Enter text" />);

      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
    });

    it("should render input with value", () => {
      render(<Input {...defaultProps} value="test value" />);

      const input = screen.getByDisplayValue("test value");
      expect(input).toBeInTheDocument();
    });

    it("should handle onChange event", () => {
      const handleChange = vi.fn();
      render(<Input {...defaultProps} onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "new value" } });

      expect(handleChange).toHaveBeenCalledWith("new value");
    });

    it("should render required input", () => {
      render(<Input {...defaultProps} required />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("required");
    });

    it("should render disabled input", () => {
      render(<Input {...defaultProps} disabled />);

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("should render input with error styling", () => {
      render(<Input {...defaultProps} error />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass(styles.input, styles.error);
    });

    it("should render input with maxLength", () => {
      render(<Input {...defaultProps} maxLength={50} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("maxLength", "50");
    });

    it("should render input with inputMode", () => {
      render(<Input {...defaultProps} inputMode="numeric" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("inputMode", "numeric");
    });

    it("should use default maxLength when not provided", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("maxLength", "255");
    });
  });

  describe("Textarea (Multiline)", () => {
    it("should render textarea when multiline is true", () => {
      render(<Input {...defaultProps} multiline />);

      const textarea = screen.getByRole("textbox");
      expect(textarea.tagName).toBe("TEXTAREA");
      expect(textarea).toHaveAttribute("id", "test-input");
      expect(textarea).toHaveAttribute("name", "testInput");
      expect(textarea).toHaveClass(styles.input);
    });

    it("should render textarea with placeholder", () => {
      render(<Input {...defaultProps} multiline placeholder="Enter text" />);

      const textarea = screen.getByPlaceholderText("Enter text");
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("should render textarea with value", () => {
      render(<Input {...defaultProps} multiline value="textarea value" />);

      const textarea = screen.getByDisplayValue("textarea value");
      expect(textarea.tagName).toBe("TEXTAREA");
    });

    it("should handle onChange event in textarea", () => {
      const handleChange = vi.fn();
      render(<Input {...defaultProps} multiline onChange={handleChange} />);

      const textarea = screen.getByRole("textbox");
      fireEvent.change(textarea, { target: { value: "new textarea value" } });

      expect(handleChange).toHaveBeenCalledWith("new textarea value");
    });

    it("should render required textarea", () => {
      render(<Input {...defaultProps} multiline required />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("required");
    });

    it("should render disabled textarea", () => {
      render(<Input {...defaultProps} multiline disabled />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });

    it("should render textarea with error styling", () => {
      render(<Input {...defaultProps} multiline error />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass(styles.input, styles.error);
    });

    it("should render textarea with maxLength", () => {
      render(<Input {...defaultProps} multiline maxLength={100} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("maxLength", "100");
    });

    it("should render textarea with custom rows", () => {
      render(<Input {...defaultProps} multiline rows={5} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "5");
    });

    it("should use default rows when not provided", () => {
      render(<Input {...defaultProps} multiline />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "3");
    });

    it("should not have inputMode attribute in textarea", () => {
      render(<Input {...defaultProps} multiline inputMode="numeric" />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).not.toHaveAttribute("inputMode");
    });

    it("should not have type attribute in textarea", () => {
      render(<Input {...defaultProps} multiline type="email" />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).not.toHaveAttribute("type");
    });
  });

  describe("PropTypes validation", () => {
    it("should warn when id prop is missing", () => {
      PropTypes.checkPropTypes(
        Input.propTypes,
        { name: "test", value: "", onChange: vi.fn(), id: undefined },
        "prop",
        "Input",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `id` is marked as required in `Input`",
        ),
      );
    });

    it("should warn when name prop is missing", () => {
      PropTypes.checkPropTypes(
        Input.propTypes,
        { id: "test", value: "", onChange: vi.fn(), name: undefined },
        "prop",
        "Input",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `name` is marked as required in `Input`",
        ),
      );
    });

    it("should warn when value prop is missing", () => {
      PropTypes.checkPropTypes(
        Input.propTypes,
        { id: "test", name: "test", onChange: vi.fn(), value: undefined },
        "prop",
        "Input",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `value` is marked as required in `Input`",
        ),
      );
    });

    it("should warn when onChange prop is missing", () => {
      PropTypes.checkPropTypes(
        Input.propTypes,
        { id: "test", name: "test", value: "", onChange: undefined },
        "prop",
        "Input",
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          "The prop `onChange` is marked as required in `Input`",
        ),
      );
    });
  });

  describe("Default props behavior", () => {
    it("should use default type when not provided", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
    });

    it("should use default required when not provided", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveAttribute("required");
    });

    it("should use default disabled when not provided", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).not.toBeDisabled();
    });

    it("should use default error when not provided", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input).not.toHaveClass(styles.error);
    });

    it("should use default multiline when not provided", () => {
      render(<Input {...defaultProps} />);

      const input = screen.getByRole("textbox");
      expect(input.tagName).toBe("INPUT");
    });
  });
});
