

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { H1, H2, H3, H4, H5, H6 } from './Heading';
import styles from './Heading.module.css';
import PropTypes from 'prop-types';



  describe('Heading Components', () => {
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

  // Test H1
  describe('H1', () => {
    it('should render H1 with children', () => {
      render(<H1>Hello H1</H1>);
      const heading = screen.getByText('Hello H1');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveClass(styles.h1);
    });

    it('should warn when H1 has no children', () => {
      PropTypes.checkPropTypes(
        H1.propTypes,
        { children: undefined },
        'prop',
        'H1'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('The prop `children` is marked as required in `H1`'));
    });

    
  });

  // Test H2
  describe('H2', () => {
    it('should render H2 with children', () => {
      render(<H2>Hello H2</H2>);
      const heading = screen.getByText('Hello H2');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveClass(styles.h2);
    });

    it('should warn when H2 has no children', () => {
      PropTypes.checkPropTypes(
        H2.propTypes,
        { children: undefined },
        'prop',
        'H2'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('The prop `children` is marked as required in `H2`'));
    });

    
  });

  // Test H3
  describe('H3', () => {
    it('should render H3 with children', () => {
      render(<H3>Hello H3</H3>);
      const heading = screen.getByText('Hello H3');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
      expect(heading).toHaveClass(styles.h3);
    });

    it('should warn when H3 has no children', () => {
      PropTypes.checkPropTypes(
        H3.propTypes,
        { children: undefined },
        'prop',
        'H3'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('The prop `children` is marked as required in `H3`'));
    });

    
  });

  // Test H4
  describe('H4', () => {
    it('should render H4 with children and default class', () => {
      render(<H4>Hello H4</H4>);
      const heading = screen.getByText('Hello H4');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H4');
      expect(heading).toHaveClass(styles.h4);
    });

    it('should render H4 with additional className', () => {
      render(<H4 className="extra-class">Hello H4</H4>);
      const heading = screen.getByText('Hello H4');
      expect(heading).toHaveClass(styles.h4, 'extra-class');
    });

    it('should warn when H4 has no children', () => {
      PropTypes.checkPropTypes(
        H4.propTypes,
        { children: undefined },
        'prop',
        'H4'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('The prop `children` is marked as required in `H4`'));
    });

    
  });

  // Test H5
  describe('H5', () => {
    it('should render H5 with children and default class', () => {
      render(<H5>Hello H5</H5>);
      const heading = screen.getByText('Hello H5');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H5');
      expect(heading).toHaveClass(styles.h5);
    });

    it('should render H5 with additional className', () => {
      render(<H5 className="extra-class">Hello H5</H5>);
      const heading = screen.getByText('Hello H5');
      expect(heading).toHaveClass(styles.h5, 'extra-class');
    });

    it('should warn when H5 has no children', () => {
      PropTypes.checkPropTypes(
        H5.propTypes,
        { children: undefined },
        'prop',
        'H5'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('The prop `children` is marked as required in `H5`'));
    });

    
  });

  // Test H6
  describe('H6', () => {
    it('should render H6 with children and default class', () => {
      render(<H6>Hello H6</H6>);
      const heading = screen.getByText('Hello H6');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H6');
      expect(heading).toHaveClass(styles.h6);
    });

    it('should render H6 with additional className', () => {
      render(<H6 className="extra-class">Hello H6</H6>);
      const heading = screen.getByText('Hello H6');
      expect(heading).toHaveClass(styles.h6, 'extra-class');
    });

    it('should warn when H6 has no children', () => {
      PropTypes.checkPropTypes(
        H6.propTypes,
        { children: undefined },
        'prop',
        'H6'
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('The prop `children` is marked as required in `H6`'));
    });

    
  });
});