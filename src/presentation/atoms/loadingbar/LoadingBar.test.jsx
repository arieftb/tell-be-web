import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoadingBar from "./LoadingBar";
import styles from "./LoadingBar.module.css";

describe("LoadingBar Component", () => {
  it("should render LoadingBar with proper structure", () => {
    const { container } = render(<LoadingBar />);

    const loadingBarContainer = container.querySelector(
      `.${styles.loadingBarContainer}`,
    );
    expect(loadingBarContainer).toBeInTheDocument();

    const loadingBar = container.querySelector(`.${styles.loadingBar}`);
    expect(loadingBar).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    const { container } = render(<LoadingBar />);

    const loadingBarContainer = container.querySelector(
      `.${styles.loadingBarContainer}`,
    );
    expect(loadingBarContainer).toHaveClass(styles.loadingBarContainer);

    const loadingBar = container.querySelector(`.${styles.loadingBar}`);
    expect(loadingBar).toHaveClass(styles.loadingBar);
  });

  it("should render without any props", () => {
    expect(() => render(<LoadingBar />)).not.toThrow();
  });

  it("should contain nested div structure", () => {
    const { container } = render(<LoadingBar />);

    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass(styles.loadingBarContainer);

    const innerDiv = outerDiv.firstChild;
    expect(innerDiv).toHaveClass(styles.loadingBar);
  });
});
