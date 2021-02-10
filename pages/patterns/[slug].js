import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import {
	View,
	Container,
	Animated,
	VStack,
	Button,
	Heading,
	Text,
	Surface,
	Elevation,
	HStack,
	Spacer,
} from '@wp-g2/components';
import copy from 'copy-to-clipboard';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { getPatternBySlug, getAllPatterns } from '../../lib/api';
import { useAppTheme } from '../../lib/appState';
import { SEO, ThemeSwitcher } from '../../components';
import Link from 'next/link';
import { parse } from '@wordpress/block-serialization-default-parser';
import { useDrag } from 'react-use-gesture';

const initialFrameContent = `
<!DOCTYPE html><html><head><link rel="stylesheet" href="/stylesheets/tachyons.css" /><link rel="stylesheet" href="/stylesheets/block-library-styles.css" /><link rel="stylesheet" href="/stylesheets/twentytwentyone.css" id="theme-stylesheet" /><style>body { pointer-events: none; }</style></head><body><div></div></body></html>
`;

const ContentFrame = ({ content, title }) => {
	const styleRef = React.useRef();
	const [theme] = useAppTheme();
	const [frameDocument, setFrameDocument] = React.useState();

	React.useEffect(() => {
		if (!frameDocument) return;
		if (!styleRef.current) {
			styleRef.current = frameDocument.querySelector('#theme-stylesheet');
		}
		styleRef.current.setAttribute('href', `/stylesheets/${theme}.css`);
	}, [theme, frameDocument]);

	const handleOnClick = (p) => {
		copy(p, { format: 'text/plain' });
	};

	return (
		<div
			style={{
				width: '100%',
				lineHeight: 0,
				height: '100%',
				verticalAlign: 'middle',
			}}
		>
			<Animated
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				transition={{ delay: 0.1 }}
				css={{
					height: '100%',
				}}
			>
				<Frame
					title={title}
					initialContent={initialFrameContent}
					style={{
						border: 'none',
						width: '100%',
						height: '100%',
						userSelect: 'none',
					}}
				>
					<FrameContextConsumer>
						{({ document }) => {
							setFrameDocument(document);
						}}
					</FrameContextConsumer>
					<Animated
						animate={{ opacity: 1 }}
						initial={{ opacity: 0 }}
						transition={{ delay: 0.1 }}
					>
						<div onClick={() => handleOnClick(content)}>
							<div
								style={{
									userSelect: 'none',
								}}
								dangerouslySetInnerHTML={{
									__html: content,
								}}
							/>
						</div>
					</Animated>
				</Frame>
			</Animated>
		</div>
	);
};

const DRAG_HANDLE_WIDTH = 4;
const RESIZABLE_DEFAULT_WIDTH =
	typeof window !== 'undefined' ? window.innerWidth : 300;

const DragHandle = () => (
	<View
		as="button"
		title="Drag to resize"
		css={{
			appearance: 'none',
			border: 'none',
			padding: 0,
			outline: 'none',
			position: 'absolute',
			top: 'clamp(100px, 500px, 40vh)',
			left: 7,
			background: 'rgba(255,255,255,0.2)',
			borderRadius: 99999,
			height: 60,
			width: 6,
			cursor: 'grab',
			'*:hover > &': {
				background: 'rgba(255,255,255,0.3)',
			},
			'*:active > &': {
				cursor: 'grabbing',
				background: 'rgba(255,255,255,0.5)',
			},
		}}
	/>
);

export default function Post({ post }) {
	const router = useRouter();
	const [x, setX] = React.useState(0);
	const width = `calc(100% - ${x}px)`;
	const frameContainerRef = React.useRef();

	const data = {
		type: 'inserter',
		blocks: parse(post.content.trim()),
		rawContent: post.content.trim(),
		contentSrc: 'use_patterns',
	};

	const dragGestures = useDrag((dp) => {
		const { dir } = dp.args[0];
		const multiplier = dir === 'left' ? 2 : -2;
		if (dp.dragging) {
			setX((prev) => prev + dp.delta[0] * multiplier);
		}
	});

	const handleOnDragStart = (event) => {
		event.dataTransfer.setData('text', JSON.stringify(data));
	};

	const handleOnClick = () => {
		copy(post.content, { format: 'text/plain' });
	};

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<div>
			<SEO title={post.title} />
			{router.isFallback ? (
				<div>Loading…</div>
			) : (
				<div>
					<Surface css={{ position: 'relative', zIndex: 100 }}>
						<VStack
							css={{ height: 70, padding: '8px 20px' }}
							alignment="center"
						>
							<Container>
								<HStack>
									<VStack spacing={1}>
										<Link href="/">
											<a
												style={{
													textDecoration: 'none',
												}}
											>
												<Text
													weight={600}
													variant="muted"
												>
													Patterns
												</Text>
											</a>
										</Link>
										<Heading size={4}>{post.title}</Heading>
									</VStack>
									<View>
										<HStack>
											<Button
												draggable
												size="large"
												onDragStart={handleOnDragStart}
												css={`
													cursor: grab;
													&:active {
														cursor: grabbing;
													}
												`}
											>
												Drag/Drop
											</Button>
											<Button
												variant="primary"
												size="large"
												onClick={handleOnClick}
											>
												Copy Pattern
											</Button>
											<Spacer>
												<View css={{ width: 8 }} />
											</Spacer>
											<View>
												<ThemeSwitcher />
											</View>
										</HStack>
									</View>
								</HStack>
							</Container>
						</VStack>
						<Elevation value={5} css={{ opacity: 0.2 }} />
					</Surface>
					<View
						css={{
							background: '#111',
							padding: '0 20px',
							height: 'calc(100vh - 70px)',
							overflow: 'hidden',
						}}
					>
						<View
							css={{
								width,
								margin: 'auto',
								minWidth: 320,
								position: 'relative',
								maxWidth: '100%',
								height: '100%',
							}}
						>
							<View
								css={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									background: 'rgba(255,255,255,0.08)',
									left: -20,
									width: 20,
									cursor: 'grab',
									'&:active': {
										cursor: 'grabbing',
									},
								}}
								{...dragGestures({ dir: 'left' })}
							>
								<DragHandle />
							</View>
							<View
								css={{
									borderLeft: '1px solid rgba(0, 0, 0, 0.04)',
									borderRight:
										'1px solid rgba(0, 0, 0, 0.04)',
									height: '100%',
									position: 'relative',
									zIndex: 1,
								}}
							>
								<div
									ref={frameContainerRef}
									style={{ height: '100%' }}
								>
									<ContentFrame {...post} />
								</div>
							</View>
							<View
								css={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									right: -20,
									background: 'rgba(255,255,255,0.08)',
									width: 20,
									cursor: 'grab',
									'&:active': {
										cursor: 'grabbing',
									},
								}}
								{...dragGestures({ dir: 'right' })}
							>
								<DragHandle />
							</View>
						</View>
					</View>
				</div>
			)}
		</div>
	);
}

export async function getStaticProps({ params }) {
	const post = getPatternBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'category',
		'content',
	]);

	return {
		props: {
			post,
		},
	};
}

export async function getStaticPaths() {
	const pages = getAllPatterns(['slug']);

	return {
		paths: pages.map((page) => {
			return {
				params: {
					slug: page.slug,
				},
			};
		}),
		fallback: false,
	};
}
