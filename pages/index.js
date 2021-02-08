import Head from 'next/head';
import Link from 'next/link';
import {
	Button,
	Grid,
	View,
	Animated,
	VStack,
	Heading,
	Container,
	HStack,
	Text,
	Card,
} from '@wp-g2/components';
import { styled } from '@wp-g2/styles';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { getAllPatterns } from '../lib/api';
import { useAppTheme } from '../lib/appState';
import { parse } from '@wordpress/block-serialization-default-parser';
import { SEO, SiteFooter, ThemeSwitcher } from '../components';
import copy from 'copy-to-clipboard';

const initialFrameContent = `
<!DOCTYPE html><html><head><link rel="stylesheet" href="/stylesheets/tachyons.css" /><link id="theme-stylesheet" rel="stylesheet" href="/stylesheets/twentytwentyone.css" /><link rel="stylesheet" href="/stylesheets/block-library-styles.css" /><style>body { display: flex; min-height: 100vh; align-items: center; justify-content: center; overflow: hidden; margin: 0; padding: 40px; }</style></head><body><div></div></body></html>
`;

const Snapshot = styled.div`
	width: 100%;
	overflow: hidden;
	cursor: pointer;
	position: relative;
	border-radius: 12px;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04) inset;

	&:active {
		cursor: grabbing;
	}
`;

const SnapshotBorder = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	border-radius: 12px;
	right: 0;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04) inset;
	pointer-events: none;
	z-index: 3;
`;

const Actions = styled.div`
	opacity: 0;
	transition: opacity 160ms linear;
	pointer-events: none;
	position: absolute;
	left: 16px;
	right: 16px;
	bottom: 16px;
	z-index: 2;

	*:hover > & {
		opacity: 1;
		pointer-events: initial;
	}

	[data-dragging='true'] > & {
		display: none;
	}
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	z-index: 1;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.24) 0%,
		rgba(0, 0, 0, 0.24) 70%,
		rgba(0, 0, 0, 0.24) 71%,
		rgba(0, 0, 0, 0.6) 100%
	);
	pointer-events: none;
	opacity: 0;
	transition: opacity 160ms linear;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

	*:hover > & {
		opacity: 1;
	}

	*:active > & {
		opacity: 0.5;
	}

	[data-dragging='true'] > & {
		display: none;
	}
`;

const ContentFrame = ({ categories = [], content, slug, index, title }) => {
	const wrapperRef = React.useRef();
	const styleRef = React.useRef();
	const [frameHeight, setFrameHeight] = React.useState('100%');
	const [frameScale, setFrameScale] = React.useState(0.3125);
	const [category] = categories;
	const [isDragging, setIsDragging] = React.useState(false);

	const [theme] = useAppTheme();
	const [frameDocument, setFrameDocument] = React.useState();

	React.useEffect(() => {
		if (!frameDocument) return;
		if (!styleRef.current) {
			styleRef.current = frameDocument.querySelector('#theme-stylesheet');
		}
		styleRef.current.setAttribute('href', `/stylesheets/${theme}.css`);
	}, [theme, frameDocument]);

	const data = {
		type: 'inserter',
		blocks: parse(content.trim()),
		rawContent: content.trim(),
		contentSrc: 'use_patterns',
	};

	const handleOnDragStart = (event) => {
		setIsDragging(true);
		event.dataTransfer.setDragImage(
			wrapperRef.current,
			wrapperRef.current.clientWidth / 2,
			wrapperRef.current.clientHeight / 2
		);
		event.dataTransfer.setData('text', JSON.stringify(data));
	};

	const handleOnDragEnd = (event) => {
		setIsDragging(false);
	};

	const handleOnClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
		copy(content, { format: 'text/plain' });
	};

	React.useEffect(() => {
		const handleOnResize = () => {
			try {
				setFrameHeight(wrapperRef.current.clientWidth);
				setFrameScale(wrapperRef.current.clientWidth / 1400);
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
			<a
				href={`/patterns/${slug}`}
				style={{
					display: 'block',
					height: '100%',
					textDecoration: 'none',
					outline: 'none',
				}}
				draggable
				onDragStart={handleOnDragStart}
				onDragEnd={handleOnDragEnd}
			>
				<VStack
					css={{ paddingBottom: 16 }}
					spacing={3}
					data-dragging={isDragging}
				>
					<Snapshot
						data-dragging={isDragging}
						ref={wrapperRef}
						style={{
							height: frameHeight,
						}}
					>
						<SnapshotBorder />
						<Actions>
							<HStack alignment="right">
								<Card css={{ padding: 2 }}>
									<Button isSubtle onClick={handleOnClick}>
										Copy
									</Button>
								</Card>
							</HStack>
						</Actions>
						<Overlay>
							<VStack spacing={1}>
								<Text
									color="currentColor"
									weight={600}
									size={18}
									align="center"
								>
									Preview
								</Text>
								<Text
									color="currentColor"
									weight={600}
									size={12}
									align="center"
									css={{ opacity: 0.8 }}
								>
									or Drag to Editor
								</Text>
							</VStack>
						</Overlay>
						<Frame
							title={title}
							initialContent={initialFrameContent}
							style={{
								border: 'none',
								width: '1400px',
								height: '1400px',
								transform: `scale(${frameScale})`,
								transformOrigin: 'top left',
								pointerEvents: 'none',
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
									setFrameDocument(document);
								}}
							</FrameContextConsumer>
						</Frame>
					</Snapshot>
					<VStack spacing={1}>
						<Text weight={500} css={{ opacity: 0.5 }} size={12}>
							{category}
						</Text>
						<Heading size={4} weight={600} truncate>
							{title}
						</Heading>
					</VStack>
				</VStack>
			</a>
		</Animated>
	);
};

export default function Home({ posts }) {
	return (
		<View>
			<SEO />
			<Container css={{ padding: 20 }}>
				<HStack>
					<Heading>Patterns</Heading>
					<View>
						<ThemeSwitcher />
					</View>
				</HStack>
			</Container>
			<Container
				css={{
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
								minmax(1fr, 300px)
							);
						}
					`}
				>
					{posts.map((post, index) => (
						<ContentFrame {...post} key={post.id} index={index} />
					))}
				</Grid>
			</Container>
			<SiteFooter />
		</View>
	);
}

export async function getStaticProps() {
	const posts = getAllPatterns(['title', 'slug', 'categories', 'content']);

	return {
		props: { posts },
	};
}
