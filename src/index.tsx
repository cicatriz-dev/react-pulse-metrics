import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './styles/global.css';
import './styles/reset.css';

createRoot(document.getElementById('root')!).render(
	<div className='bg-red-500 mt-1000'>
		<App />
	</div>,
);
