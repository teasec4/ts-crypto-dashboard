// Dark theme colors
export const theme = {
  // Background
  bg: {
    primary: "bg-gray-900",
    secondary: "bg-gray-800",
    tertiary: "bg-gray-700",
  },
  // Text
  text: {
    primary: "text-white",
    secondary: "text-gray-300",
    muted: "text-gray-500",
  },
  // Header/Navigation
  header: {
    bg: "bg-gradient-to-r from-blue-700 to-blue-800",
    text: "text-white",
  },
  // Cards
  card: {
    bg: "bg-gray-800",
    border: "border-gray-700",
    shadow: "shadow-lg",
  },
  // Buttons
  button: {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-700 hover:bg-gray-600",
  },
  // Status colors
  status: {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
  },
  // Error message
  error: {
    bg: "bg-red-900/20",
    border: "border-red-800",
    text: "text-red-300",
  },
} as const;
