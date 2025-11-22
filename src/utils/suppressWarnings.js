// Suppress specific console warnings in development
// This must run as early as possible, before any other code executes
(function() {
  if (import.meta.env.DEV) {
    const originalWarn = console.warn
    const originalLog = console.log
    const originalError = console.error

    // Patterns to suppress
    const suppressPatterns = [
      /Download the React DevTools/i,
      /React DevTools/i,
      /production build of Inferno/i,
      /dev:module entry point/i,
    ]

    const shouldSuppress = (args) => {
      if (!args || args.length === 0) return false
      
      // Check all arguments, not just the first one
      for (const arg of args) {
        if (typeof arg === 'string') {
          for (const pattern of suppressPatterns) {
            if (pattern.test(arg)) {
              return true
            }
          }
        }
        // Also check if it's an object with message property
        if (arg && typeof arg === 'object' && arg.message) {
          for (const pattern of suppressPatterns) {
            if (pattern.test(String(arg.message))) {
              return true
            }
          }
        }
      }
      return false
    }

    // Override console.warn
    console.warn = (...args) => {
      if (!shouldSuppress(args)) {
        originalWarn.apply(console, args)
      }
    }

    // Override console.log
    console.log = (...args) => {
      if (!shouldSuppress(args)) {
        originalLog.apply(console, args)
      }
    }

    // Override console.error (some libraries use error instead)
    console.error = (...args) => {
      if (!shouldSuppress(args)) {
        originalError.apply(console, args)
      }
    }
  }
})()

