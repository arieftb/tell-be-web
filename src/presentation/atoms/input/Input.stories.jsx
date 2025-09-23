import Input from "./Input";

export default {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Versatile input component supporting both regular input and textarea modes. Includes validation states, different input types, and comprehensive customization options.",
      },
    },
  },
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique identifier for the input element",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type attribute",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for form submission",
    },
    value: {
      control: { type: "text" },
      description: "Current value of the input",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text when input is empty",
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the input is required",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    error: {
      control: { type: "boolean" },
      description: "Whether the input has an error state",
    },
    maxLength: {
      control: { type: "number" },
      description: "Maximum number of characters allowed",
    },
    inputMode: {
      control: { type: "select" },
      options: ["text", "numeric", "email", "tel", "url"],
      description: "Input mode for virtual keyboards",
    },
    multiline: {
      control: { type: "boolean" },
      description: "Whether to render as textarea",
    },
    rows: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of rows for textarea mode",
    },
    onChange: {
      action: "changed",
      description: "Change event handler",
    },
  },
};

// Default input story
export const Default = {
  args: {
    id: "default-input",
    name: "defaultInput",
    value: "",
  },
};

// Input with placeholder
export const WithPlaceholder = {
  args: {
    id: "placeholder-input",
    name: "placeholderInput",
    value: "",
    placeholder: "Enter your text here...",
  },
};

// Input with value
export const WithValue = {
  args: {
    id: "value-input",
    name: "valueInput",
    value: "Hello World",
  },
};

// Required input
export const Required = {
  args: {
    id: "required-input",
    name: "requiredInput",
    value: "",
    placeholder: "This field is required",
    required: true,
  },
};

// Disabled input
export const Disabled = {
  args: {
    id: "disabled-input",
    name: "disabledInput",
    value: "This input is disabled",
    disabled: true,
  },
};

// Error state
export const ErrorState = {
  args: {
    id: "error-input",
    name: "errorInput",
    value: "Invalid input",
    placeholder: "Enter valid data",
    error: true,
  },
};

// Email input type
export const EmailType = {
  args: {
    id: "email-input",
    name: "email",
    type: "email",
    value: "",
    placeholder: "user@example.com",
    inputMode: "email",
  },
};

// Password input type
export const PasswordType = {
  args: {
    id: "password-input",
    name: "password",
    type: "password",
    value: "",
    placeholder: "Enter your password",
  },
};

// Number input type
export const NumberType = {
  args: {
    id: "number-input",
    name: "number",
    type: "number",
    value: "",
    placeholder: "Enter a number",
    inputMode: "numeric",
  },
};

// Input with max length
export const WithMaxLength = {
  args: {
    id: "maxlength-input",
    name: "maxlengthInput",
    value: "",
    placeholder: "Maximum 10 characters",
    maxLength: 10,
  },
};

// Textarea mode (multiline)
export const TextareaMode = {
  args: {
    id: "textarea-input",
    name: "textareaInput",
    value: "",
    placeholder: "Enter your message here...",
    multiline: true,
    rows: 4,
  },
};

// Textarea with content
export const TextareaWithContent = {
  args: {
    id: "textarea-content",
    name: "textareaContent",
    value:
      "This is a multi-line text area\nwith some content\nspanning multiple lines.",
    multiline: true,
    rows: 5,
  },
};

// Textarea error state
export const TextareaError = {
  args: {
    id: "textarea-error",
    name: "textareaError",
    value: "This textarea has an error",
    placeholder: "Enter valid content",
    multiline: true,
    rows: 3,
    error: true,
  },
};

// Disabled textarea
export const TextareaDisabled = {
  args: {
    id: "textarea-disabled",
    name: "textareaDisabled",
    value: "This textarea is disabled",
    multiline: true,
    rows: 3,
    disabled: true,
  },
};

// Interactive playground
export const Interactive = {
  args: {
    id: "interactive-input",
    name: "interactiveInput",
    type: "text",
    value: "",
    placeholder: "Try different settings...",
    required: false,
    disabled: false,
    error: false,
    maxLength: 255,
    multiline: false,
    rows: 3,
  },
};

// All input types showcase
export const AllInputTypes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        id="text-demo"
        name="textDemo"
        type="text"
        placeholder="Text input"
        value=""
        onChange={() => {}}
      />
      <Input
        id="email-demo"
        name="emailDemo"
        type="email"
        placeholder="Email input"
        value=""
        onChange={() => {}}
      />
      <Input
        id="password-demo"
        name="passwordDemo"
        type="password"
        placeholder="Password input"
        value=""
        onChange={() => {}}
      />
      <Input
        id="number-demo"
        name="numberDemo"
        type="number"
        placeholder="Number input"
        value=""
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of different input types available",
      },
    },
  },
};

// All states showcase
export const AllStates = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        id="normal-demo"
        name="normalDemo"
        placeholder="Normal state"
        value=""
        onChange={() => {}}
      />
      <Input
        id="required-demo"
        name="requiredDemo"
        placeholder="Required state"
        value=""
        required
        onChange={() => {}}
      />
      <Input
        id="error-demo"
        name="errorDemo"
        placeholder="Error state"
        value="Invalid value"
        error
        onChange={() => {}}
      />
      <Input
        id="disabled-demo"
        name="disabledDemo"
        placeholder="Disabled state"
        value="Disabled input"
        disabled
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available input states",
      },
    },
  },
};

// Form example
export const FormExample = {
  render: () => (
    <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Full Name"
        value=""
        required
        onChange={() => {}}
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email Address"
        value=""
        required
        onChange={() => {}}
      />
      <Input
        id="message"
        name="message"
        placeholder="Your message..."
        value=""
        multiline
        rows={4}
        required
        onChange={() => {}}
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of inputs used in a form context",
      },
    },
  },
};
