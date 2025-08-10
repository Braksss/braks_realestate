/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'secondary-text': '#4B5563',
        'accent': '#F97316',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-links': theme('colors.orange[500]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '--tw-prose-bullets': theme('colors.orange[400]'),
            '--tw-prose-quotes': theme('colors.gray[800]'),
            '--tw-prose-quote-borders': theme('colors.orange[300]'),
            h2: {
              fontWeight: '700',
              borderBottom: `2px solid ${theme('colors.gray.200')}`,
              paddingBottom: theme('spacing.2'),
              marginTop: theme('spacing.16'),
            },
            h3: {
              fontWeight: '600',
              marginTop: theme('spacing.12'),
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '0.25rem',
              paddingLeft: theme('spacing.4'),
              marginLeft: '0',
              marginRight: '0',
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}