import { ThemeProvider } from '@wp-g2/styles';
// import '../styles/block-library-styles.css';
// import '../styles/tt1.css';
// import '../styles/tachyons.css';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<ThemeProvider />
			<Component {...pageProps} />
		</>
	);
}
