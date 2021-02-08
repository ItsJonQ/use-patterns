import Head from 'next/head';
import { useRouter } from 'next/router';

const baseUrl = 'https://use-patterns.vercel.app';
const defaultDescription = `Curated Gutenberg block patterns.`;

export default function SEO({
	title,
	image,
	description = defaultDescription,
}) {
	const siteTitle = title ? `${title} | Patterns` : 'Patterns';
	const router = useRouter();

	const url = `${baseUrl}${router.asPath}`;
	const imagePath = image ? `${baseUrl}${image}` : undefined;

	return (
		<Head>
			<title>{siteTitle}</title>
			<meta name="title" content={siteTitle} />
			<meta name="description" content={description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={siteTitle} />
			<meta property="og:description" content={description} />
			{imagePath && <meta property="og:image" content={imagePath} />}

			<meta property="twitter:creator" content="@itsjonq" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={url} />
			<meta property="twitter:title" content={siteTitle} />
			<meta property="twitter:description" content={description} />

			{imagePath && <meta property="twitter:image" content={imagePath} />}

			<link rel="icon" href="/favicon.ico" />
			<link rel="preload" as="style" href="/stylesheets/tachyons.css" />
			<link
				rel="preload"
				as="style"
				href="/stylesheets/block-library-styles.css"
			/>
			<link
				rel="preload"
				as="style"
				href="/stylesheets/twentytwentyone.css"
			/>
			<link
				rel="preload"
				as="style"
				href="/stylesheets/twentytwenty.css"
			/>
			<link
				rel="preload"
				as="style"
				href="/stylesheets/twentynineteen.css"
			/>
		</Head>
	);
}
