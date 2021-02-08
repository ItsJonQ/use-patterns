import create from 'zustand';
import { useLocalState } from '@wp-g2/utils';
import React from 'react';

export const appState = create((set, get) => ({
	theme: 'twentytwentyone',
	setTheme: (next) => set({ theme: next }),
	setInitialTheme: (next) => {
		if (get().didLoad) return;
		get().setTheme(next);
	},
	didLoad: false,
}));

export const useAppState = appState;

export const useAppTheme = () => {
	const [theme, setTheme] = useLocalState(
		'use-patterns/theme',
		'twentytwentyone'
	);
	const [appTheme, setAppTheme] = useAppState((state) => [
		state.theme,
		state.setTheme,
	]);

	if (appState().didLoad) {
		appState().setInitialTheme(theme);
	}

	const handleOnChange = React.useCallback(
		(next) => {
			setTheme(next);
			setAppTheme(next);
		},
		[setAppTheme]
	);

	return [appTheme, handleOnChange];
};
