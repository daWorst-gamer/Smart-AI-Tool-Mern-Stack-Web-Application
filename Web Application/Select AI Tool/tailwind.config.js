module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: '640px',   
      md: '768px',    
      lg: '1024px',   
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        // Primary Colors
        primary: {
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)"
        },
        // Secondary Colors
        secondary: {
          background: "var(--secondary-background)",
          foreground: "var(--secondary-foreground)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)"
        },
        // Accent Colors
        accent: {
          yellow: "var(--accent-yellow)",
          yellowLight: "var(--accent-yellow-light)",
          green: "var(--accent-green)",
          purple: "var(--accent-purple)",
          blue: "var(--accent-blue)",
          blueLight: "var(--accent-blue-light)"
        },
        // Border Colors
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          accent: "var(--border-accent)"
        },
        // Text Colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          mutedLight: "var(--text-muted-light)",
          mutedMedium: "var(--text-muted-medium)",
          disabled: "var(--text-disabled)",
          white: "var(--text-white)"
        },
        // Background Colors
        background: {
          main: "var(--bg-main)",
          overlay: "var(--bg-overlay)",
          footer: "var(--bg-footer)"
        },
        // Component-specific Colors
        header: {
          text: "var(--header-text)",
          background: "var(--header-bg)"
        },
        button: {
          primary: "var(--button-bg-primary)",
          secondary: "var(--button-bg-secondary)"
        },
        search: {
          background: "var(--search-bg)",
          border: "var(--search-border)"
        },
        chip: {
          active: "var(--chip-bg-active)",
          inactive: "var(--chip-bg-inactive)"
        }
      },
      // Typography
      fontSize: {
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)',
        'extrabold': 'var(--font-weight-extrabold)'
      },
      lineHeight: {
        'tight': 'var(--line-height-tight)',
        'snug': 'var(--line-height-snug)',
        'normal': 'var(--line-height-normal)',
        'relaxed': 'var(--line-height-relaxed)',
        'loose': 'var(--line-height-loose)',
        'xl': 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)'
      },
      // Spacing
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
        '5xl': 'var(--spacing-5xl)',
        '6xl': 'var(--spacing-6xl)',
        '7xl': 'var(--spacing-7xl)',
        '8xl': 'var(--spacing-8xl)'
      },
      // Border Radius
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'full': 'var(--radius-full)'
      },
      // Font Families
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
        'public': ['Public Sans', 'sans-serif'],
        'work': ['Work Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};