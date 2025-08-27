import {render, screen, cleanup} from '@testing-library/react';
import {vi} from 'vitest';
import Avatar from './Avatar';
import AvatarModule from './Avatar.module.css';

describe('Avatar Component', () => {
  // Mock console.error and console.warn to catch PropTypes warnings
  let consoleErrorSpy;
  let consoleWarnSpy;
  let originalNodeEnv;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development'; // Ensure React is in development mode for PropTypes

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    process.env.NODE_ENV = originalNodeEnv; // Restore original NODE_ENV
    cleanup(); // Ensure DOM is cleaned up after each test
  });

  // Test Case 1: Renders <img> with correct src and alt
  it('should render an <img> element with the correct src and alt attributes', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} />);
    const avatarImage = screen.getByAltText(alt);
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', src);
  });

  // Test Case 2: Applies default medium size class when size prop is not provided
  it('should have class avatar and default size class medium when no size prop is provided', () => {
    const src = 'https://example.com/avatar.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} />);
    const avatarImage = screen.getByAltText(alt);
    expect(avatarImage).toHaveClass(AvatarModule.avatar);
    expect(avatarImage).toHaveClass(AvatarModule.medium);
  });

  // Test Case 3: Applies small size class when size="small"
  it('should have class avatar small when size="small"', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} size="small" />);
    const avatarImage = screen.getByAltText(alt);
    expect(avatarImage).toHaveClass(AvatarModule.avatar);
    expect(avatarImage).toHaveClass(AvatarModule.small);
  });

  // Test Case 4: Applies large size class when size="large"
  it('should have class avatar large when size="large"', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} size="large" />);
    const avatarImage = screen.getByAltText(alt);
    expect(avatarImage).toHaveClass(AvatarModule.avatar);
    expect(avatarImage).toHaveClass(AvatarModule.large);
  });

  // Test Case 5: Always includes the base avatar class (refactored)
  it('should always include the base avatar class for small size', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} size="small" />);
    expect(screen.getByAltText(alt)).toHaveClass(AvatarModule.avatar);
  });

  it('should always include the base avatar class for medium size', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} size="medium" />);
    expect(screen.getByAltText(alt)).toHaveClass(AvatarModule.avatar);
  });

  it('should always include the base avatar class for large size', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} size="large" />);
    expect(screen.getByAltText(alt)).toHaveClass(AvatarModule.avatar);
  });

  it('should always include the base avatar class for default size', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} />);
    expect(screen.getByAltText(alt)).toHaveClass(AvatarModule.avatar);
  });

  // Test Case 6: Accessible via alt text
  it('should be accessible via alt text', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'Accessible Avatar';
    render(<Avatar src={src} alt={alt} />);
    expect(screen.getByAltText(alt)).toBeInTheDocument();
  });
});
