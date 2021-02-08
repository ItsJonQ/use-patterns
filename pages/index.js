import Head from 'next/head';
import Link from 'next/link';
import { Grid, View, Animated } from '@wp-g2/components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { getAllPatterns } from '../lib/api';

const initialFrameContent = `
<!DOCTYPE html><html><head><link rel="stylesheet" href="/stylesheets/tachyons.css" /><link rel="stylesheet" href="/stylesheets/block-library-styles.css" /><link rel="stylesheet" href="/stylesheets/tt1.css" /><style>body { display: flex; min-height: 100vh; align-items: center; justify-content: center; }</style></head><body><div></div></body></html>
`;

const ContentFrame = ({ content, slug, index }) => {
	const wrapperRef = React.useRef();
	const [frameHeight, setFrameHeight] = React.useState('100%');
	const [frameDocument, setFrameDocument] = React.useState();
	const [frameScale, setFrameScale] = React.useState(0.3125);

	React.useEffect(() => {
		const handleOnResize = () => {
			try {
				setFrameHeight(wrapperRef.current.clientWidth);
				setFrameScale(wrapperRef.current.clientWidth / 1280);
			} catch (err) {}
		};

		handleOnResize();

		window.addEventListener('resize', handleOnResize);

		return () => {
			window.addEventListener('resize', handleOnResize);
		};
	}, [frameDocument]);

	return (
		<Animated
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 10 }}
			transition={{ delay: Math.min(0.1 * (index + 1), 1) }}
		>
			<div
				ref={wrapperRef}
				style={{
					width: '100%',
					height: frameHeight,
					overflow: 'hidden',
					lineHeight: 0,
					verticalAlign: 'middle',
					cursor: 'pointer',
				}}
			>
				<Link as={`/patterns/${slug}`} href="/patterns/[slug]" passHref>
					<a style={{ display: 'block', height: '100%' }}>
						<Frame
							initialContent={initialFrameContent}
							style={{
								border: 'none',
								width: '1280px',
								height: '1280px',
								transform: `scale(${frameScale})`,
								transformOrigin: 'top left',
								pointerEvents: 'none',
								borderRadius: 16,
							}}
						>
							<Animated
								animate={{ opacity: 1 }}
								initial={{ opacity: 0 }}
								transition={{ delay: 0.1 }}
							>
								<div>
									<div
										dangerouslySetInnerHTML={{
											__html: content,
										}}
										style={{
											pointerEvents: 'none',
											userSelect: 'none',
										}}
									/>
								</div>
							</Animated>
							<FrameContextConsumer>
								{({ document }) => {
									// Render Children
									setFrameDocument(document);
								}}
							</FrameContextConsumer>
						</Frame>
					</a>
				</Link>
			</div>
		</Animated>
	);
};

export default function Home({ posts }) {
	return (
		<View>
			<Head>
				<title>G2</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				style={{
					maxWidth: 1280,
					margin: '10vh auto',
					padding: 20,
				}}
			>
				<Grid
					gap={5}
					css={`
						grid-template-columns: repeat(
							auto-fill,
							minmax(300px, 1fr)
						);
						@media (min-width: 640px) {
							grid-template-columns: repeat(
								auto-fill,
								minmax(280px, 1fr)
							);
						}
						@media (min-width: 880px) {
							grid-template-columns: repeat(
								auto-fill,
								minmax(300px, 1fr)
							);
						}
					`}
				>
					{posts.map((post, index) => (
						<ContentFrame {...post} key={post.id} index={index} />
					))}
				</Grid>
			</div>
		</View>
	);
}

export async function getStaticProps() {
	const posts = getAllPatterns(['title', 'slug', 'category', 'content']);

	return {
		props: { posts },
	};
}
