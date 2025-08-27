import {render, screen, fireEvent} from '@testing-library/react';
import {vi} from 'vitest';
import Button from './Button';
import ButtonModule from './Button.module.css';
import {ParagraphText, SmallText} from '../text/Text';
import TextModule from '../text/Text.module.css';
import PropTypes from 'prop-types';

describe('Button Component', () => {
  // Mock console.error and console.warn to catch PropTypes warnings
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  // Test Case 1: Render dengan default props
  it('should render with default props (primary, medium, button, not disabled)', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(ButtonModule.primary);
    expect(buttonElement).toHaveClass(ButtonModule.medium);
    expect(buttonElement).toHaveAttribute('type', 'button');
    expect(buttonElement).not.toBeDisabled();

    // Check if children are wrapped by ParagraphText (which renders a <p> with text and paragraph class)
    const paragraphTextElement = screen.getByText(/click me/i);
    expect(paragraphTextElement.tagName).toBe('P');
    expect(paragraphTextElement).toHaveClass(TextModule.text);
    expect(paragraphTextElement).toHaveClass(TextModule.paragraph);
  });

  // Test Case 2: Render dengan variant = secondary
  it('should render with secondary variant', () => {
    render(<Button variant="secondary">Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass(ButtonModule.secondary);
  });

  // Test Case 3: Render dengan size = small
  it('should render with small size and children wrapped by SmallText', () => {
    render(<Button size="small">Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass(ButtonModule.small);

    // Check if children are wrapped by SmallText (which renders a <p> with text and small class)
    const smallTextElement = screen.getByText(/click me/i);
    expect(smallTextElement.tagName).toBe('P');
    expect(smallTextElement).toHaveClass(TextModule.text);
    expect(smallTextElement).toHaveClass(TextModule.small);
  });

  // Test Case 4: Render dengan size = medium
  it('should render with medium size and children wrapped by ParagraphText', () => {
    render(<Button size="medium">Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass(ButtonModule.medium);

    // Check if children are wrapped by ParagraphText
    const paragraphTextElement = screen.getByText(/click me/i);
    expect(paragraphTextElement.tagName).toBe('P');
    expect(paragraphTextElement).toHaveClass(TextModule.text);
    expect(paragraphTextElement).toHaveClass(TextModule.paragraph);
  });

  // Test Case 5: Render dengan size = large
  it('should render with large size and children wrapped by ParagraphText', () => {
    render(<Button size="large">Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});
    expect(buttonElement).toHaveClass(ButtonModule.large);

    // Check if children are wrapped by ParagraphText
    const paragraphTextElement = screen.getByText(/click me/i);
    expect(paragraphTextElement.tagName).toBe('P');
    expect(paragraphTextElement).toHaveClass(TextModule.text);
    expect(paragraphTextElement).toHaveClass(TextModule.paragraph);
  });

  // Test Case 6: Disabled state
  it('should be disabled and not call onClick when disabled={true}', () => {
    const handleClick = vi.fn();
    render(<Button disabled={true} onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});

    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test Case 7: onClick handler
  it('should call onClick function once when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', {name: /click me/i});

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test Case 8: Type variations
  it('should have type="submit" when type="submit" is provided', () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole('button', {name: /submit/i});
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('should have type="reset" when type="reset" is provided', () => {
    render(<Button type="reset">Reset</Button>);
    const buttonElement = screen.getByRole('button', {name: /reset/i});
    expect(buttonElement).toHaveAttribute('type', 'reset');
  });

  // Test Case 9: Invalid prop variant
  it('should warn about invalid variant prop', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    PropTypes.checkPropTypes(
      Button.propTypes,
      {children: 'Test', variant: 'tertiary'},
      'prop',
      Button.name,
    );

    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy.mock.calls[0][0]).toContain(
      'Invalid prop `variant` of value `tertiary` supplied to `Button`',
    );

    errorSpy.mockRestore();
  });

  // Test Case 10: Invalid prop size
  it('should warn about invalid size prop', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    PropTypes.checkPropTypes(
      Button.propTypes,
      {children: 'Test', size: 'xlarge'},
      'prop',
      Button.name,
    );

    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy.mock.calls[0][0]).toContain(
      'Invalid prop `size` of value `xlarge` supplied to `Button`',
    );

    errorSpy.mockRestore();
  });

  // Test Case 11: Invalid prop type
  it('should warn about invalid type prop', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    PropTypes.checkPropTypes(
      Button.propTypes,
      {children: 'Test', type: 'link'},
      'prop',
      Button.name,
    );

    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy.mock.calls[0][0]).toContain(
      'Invalid prop `type` of value `link` supplied to `Button`',
    );

    errorSpy.mockRestore();
  });

  // Test Case 12: Children rendering
  it('should render children text inside the button', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});
