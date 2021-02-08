import { createTheme } from '@wp-g2/styles';

const theme = createTheme(({ get, space, theme }) => {
	const COLOR_PROPS = {
		colorAdmin: '#3858E9',
		colorText: '#2a2b2c',
		colorCoolGray50: '#F9FAFB',
		colorCoolGray100: '#F3F4F6',
		colorCoolGray200: '#E5E7EB',
		colorCoolGray300: '#D1D5DB',
		colorCoolGray400: '#9CA3AF',
		colorCoolGray500: '#6B7280',
		colorCoolGray600: '#4B5563',
		colorCoolGray700: '#374151',
		colorCoolGray800: '#1F2937',
		colorCoolGray900: '#111827',
		colorRed50: '#FEF2F2',
		colorRed100: '#FEE2E2',
		colorRed200: '#FECACA',
		colorRed300: '#FCA5A5',
		colorRed400: '#F87171',
		colorRed500: '#EF4444',
		colorRed600: '#DC2626',
		colorRed700: '#B91C1C',
		colorRed800: '#991B1B',
		colorRed900: '#7F1D1D',
		colorYellow50: '#FFFBEB',
		colorYellow100: '#FEF3C7',
		colorYellow200: '#FDE68A',
		colorYellow300: '#FCD34D',
		colorYellow400: '#FBBF24',
		colorYellow500: '#F59E0B',
		colorYellow600: '#D97706',
		colorYellow700: '#B45309',
		colorYellow800: '#92400E',
		colorYellow900: '#78350F',
		colorGreen50: '#ECFDF5',
		colorGreen100: '#D1FAE5',
		colorGreen200: '#A7F3D0',
		colorGreen300: '#6EE7B7',
		colorGreen400: '#34D399',
		colorGreen500: '#10B981',
		colorGreen600: '#059669',
		colorGreen700: '#047857',
		colorGreen800: '#065F46',
		colorGreen900: '#064E3B',
		colorBlue50: '#EFF6FF',
		colorBlue100: '#DBEAFE',
		colorBlue200: '#BFDBFE',
		colorBlue300: '#93C5FD',
		colorBlue400: '#60A5FA',
		colorBlue500: '#3B82F6',
		colorBlue600: '#2563EB',
		colorBlue700: '#1D4ED8',
		colorBlue800: '#1E40AF',
		colorBlue900: '#1E3A8A',
		colorIndigo50: '#EEF2FF',
		colorIndigo100: '#E0E7FF',
		colorIndigo200: '#C7D2FE',
		colorIndigo300: '#A5B4FC',
		colorIndigo400: '#818CF8',
		colorIndigo500: '#6366F1',
		colorIndigo600: '#4F46E5',
		colorIndigo700: '#4338CA',
		colorIndigo800: '#3730A3',
		colorIndigo900: '#312E81',
		colorPurple50: '#F5F3FF',
		colorPurple100: '#EDE9FE',
		colorPurple200: '#DDD6FE',
		colorPurple300: '#C4B5FD',
		colorPurple400: '#A78BFA',
		colorPurple500: '#8B5CF6',
		colorPurple600: '#7C3AED',
		colorPurple700: '#6D28D9',
		colorPurple800: '#5B21B6',
		colorPurple900: '#4C1D95',
		colorPink50: '#FDF2F8',
		colorPink100: '#FCE7F3',
		colorPink200: '#FBCFE8',
		colorPink300: '#F9A8D4',
		colorPink400: '#F472B6',
		colorPink500: '#EC4899',
		colorPink600: '#DB2777',
		colorPink700: '#BE185D',
		colorPink800: '#9D174D',
		colorPink900: '#831843',
	};

	const FONT_PROPS = {
		fontSize: '13px',
	};

	const CONTROL_PROPS = {
		controlBackgroundColor: 'rgba(0, 0, 0, 0.05)',
		controlBackgroundColorHover: 'rgba(0, 0, 0, 0.05)',
		controlBackgroundDimColor: 'rgba(0, 0, 0, 0.1)',
		controlBackgroundBrightColor: 'rgba(0, 0, 0, 0.03)',
		controlBorderColor: 'transparent',
		controlBorderColorHover: 'transparent',
		controlBorderColorSubtle: 'transparent',
		controlBorderRadius: '4px',
		controlBorderSubtleColor: 'rgba(0, 0, 0, 0.2)',
		controlBoxShadow: 'transparent',
		controlBoxShadowFocus: `0 0 0 2px ${get('controlBackgroundDimColor')}`,
		controlHeight: '28px',
		controlPaddingX: '8px',
		controlPaddingXLarge: '16px',
		controlPaddingXSmall: '4px',
		controlPrimaryTextColorActive: get('white'),
		controlPrimaryTextColor: get('white'),
		controlSurfaceBoxShadow:
			'0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2)',
		controlSurfaceColor: get('white'),
		controlTextActiveColor: get('colorAdmin'),
	};

	const BUTTON_PROPS = {
		buttonPrimaryColor: get('colorAdmin'),
		buttonPrimaryTextColor: get('controlPrimaryTextColor'),
		buttonPrimaryTextColorActive: get('controlPrimaryTextColor'),

		buttonSecondaryColor: 'transparent',
		buttonSecondaryColorHover: get('controlBackgroundColor'),
		buttonSecondaryColorActive: get('controlBackgroundColor'),
		buttonSecondaryColorFocus: get('controlBackgroundColor'),
		buttonSecondaryBorderColor: get('buttonPrimaryColor'),
		buttonSecondaryTextColor: get('buttonPrimaryColor'),
		buttonSecondaryTextColorActive: get('buttonPrimaryColor'),
		buttonSecondaryTextColorFocus: get('buttonPrimaryColor'),
		buttonSecondaryBorderColorHover: get('buttonPrimaryColor'),
		buttonSecondaryBorderColorActive: get('buttonPrimaryColor'),
	};

	const CARD_PROPS = {
		cardBorderRadius: '4px',
		cardPaddingX: space(3),
		cardPaddingY: space(3),
		cardPadding: `${get('cardPaddingX')} ${get('cardPaddingY')}`,
		cardHeaderFooterPaddingY: space(1),
		cardHeaderHeight: '44px',
	};

	const ELEVATION_PROPS = {
		elevationIntensity: 0.4,
	};

	const MENU_PROPS = {
		menuItemHeight: get('controlHeight'),
	};

	const SEGMENTED_CONTROL_PROPS = {
		segmentedControlFontSize: get('fontSize'),
		segmentedControlBackdropBoxShadow: get('controlSurfaceBoxShadow'),
	};

	const SLIDER_PROPS = {
		sliderThumbBackgroundColor: get('white'),
		sliderThumbBorderColor: get('controlBorderColor'),
		sliderThumbBoxShadow: `0 0 2px rgba(0, 0, 0, 0.2), ${get(
			'controlSurfaceBoxShadow'
		)}`,
	};

	const SWITCH_PROPS = {
		switchToggleBackgroundColor: get('controlPrimaryTextColor'),
		switchToggleBackgroundColorActive: get('controlPrimaryTextColor'),
		switchToggleBorderColor: get('controlBorderColor'),
		switchToggleBoxShadow: get('controlSurfaceBoxShadow'),
		switchBackdropBackgroundColor: get('controlBackgroundColor'),
		switchBackdropBackgroundColorActive: get('colorAdmin'),
		switchBackdropBorderColor: get('controlBorderColor'),
		switchBackdropBorderColorActive: get('colorAdmin'),
		switchBackdropBorderColorFocus: get('colorText'),
		switchToggleBackgroundColor: get('white'),
		switchPaddingOffset: '4px',
	};

	return {
		...theme,
		...FONT_PROPS,
		...BUTTON_PROPS,
		...CARD_PROPS,
		...COLOR_PROPS,
		...CONTROL_PROPS,
		...ELEVATION_PROPS,
		...MENU_PROPS,
		...SEGMENTED_CONTROL_PROPS,
		...SLIDER_PROPS,
		...SWITCH_PROPS,
	};
});

export default theme;
