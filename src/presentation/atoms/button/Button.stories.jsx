import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Primary button component for user interactions. Supports multiple variants, sizes, and states for different use cases.",
      },
    },
  },
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Button text content",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "Visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Size of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "HTML button type attribute",
    },
    onClick: {
      action: "clicked",
      description: "Click event handler",
    },
  },
};

// Default button story
export const Default = {
  args: {
    children: "Button",
  },
};

// Primary variant stories
export const Primary = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

// Size variant stories
export const Small = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Medium = {
  args: {
    children: "Medium Button",
    size: "medium",
  },
};

export const Large = {
  args: {
    children: "Large Button",
    size: "large",
  },
};

// State stories
export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const DisabledSecondary = {
  args: {
    children: "Disabled Secondary",
    variant: "secondary",
    disabled: true,
  },
};

// Type variations
export const SubmitButton = {
  args: {
    children: "Submit",
    type: "submit",
    variant: "primary",
  },
};

export const ResetButton = {
  args: {
    children: "Reset",
    type: "reset",
    variant: "secondary",
  },
};

// Interactive story with all controls
export const Interactive = {
  args: {
    children: "Interactive Button",
    variant: "primary",
    size: "medium",
    disabled: false,
    type: "button",
  },
};

// All variants showcase
export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of all button variants and states",
      },
    },
  },
};

// All sizes showcase
export const AllSizes = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available button sizes",
      },
    },
  },
};

// Long text handling
export const LongText = {
  args: {
    children: "This is a very long button text to test text wrapping",
  },
  parameters: {
    docs: {
      description: {
        story: "Button with long text content to test text handling",
      },
    },
  },
};
