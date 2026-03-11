import type { Config } from 'tailwindcss';

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// mapear as variáveis CSS existentes para tokens do Tailwind
				primary: '#6c63ff', // cor usada no Dashboard e nos MetricCards
				surface: '#ffffff',
				background: '#f5f7fa',
				'text-primary': '#2d3748',
				'text-secondary': '#718096',
				border: '#e2e8f0',
				success: '#38a169',
				warning: '#ed8936',
				error: '#e53e3e',
			},
			borderRadius: {
				DEFAULT: '8px',
			},
		},
	},
	plugins: [],
} satisfies Config;
