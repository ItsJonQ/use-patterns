import { FormGroup, Select, Text } from '@wp-g2/components';
import { useAppTheme } from '../lib/appState';

const themeOptions = [
	{ value: 'twentytwentyone', label: 'Twenty Twenty One' },
	{ value: 'twentytwenty', label: 'Twenty Twenty' },
	{ value: 'twentynineteen', label: 'Twenty Nineteen' },
];

export default function ThemeSwitcher() {
	const [theme, setTheme] = useAppTheme();

	return (
		<FormGroup label="Theme" labelHidden>
			<Select
				options={themeOptions}
				value={theme}
				onChange={setTheme}
				size="large"
				prefix={
					<Text css={{ paddingLeft: 8, opacity: 0.5 }}>Theme:</Text>
				}
			/>
		</FormGroup>
	);
}
