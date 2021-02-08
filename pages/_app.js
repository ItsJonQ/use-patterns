import '../styles/global.css';

import { ThemeProvider } from '@wp-g2/styles';
import theme from '../lib/theme';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider theme={theme} isGlobal />
			<Component {...pageProps} />
		</>
	);
}
