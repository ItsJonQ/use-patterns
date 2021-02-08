import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import {
	View,
	Container,
	Animated,
	VStack,
	Button,
	Heading,
	Text,
	HStack,
} from '@wp-g2/components';
import copy from 'copy-to-clipboard';
import Frame from 'react-frame-component';
import { getPatternBySlug, getAllPatterns } from '../../lib/api';
import Link from 'next/link';
import { useDrag } from 'react-use-gesture';

const initialFrameContent = `
<!DOCTYPE html><html><head><link type="text/css" rel="stylesheet" href="/stylesheets/tachyons.css" /><link type="text/css" rel="stylesheet" href="/stylesheets/block-library-styles.css" /><link type="text/css" rel="stylesheet" href="/stylesheets/tt1.css" /><style>body { padding: 20px; pointer-events: none; }</style></head><body><div></div></body></html>
`;

const ContentFrame = ({ content }) => {
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
					initialContent={initialFrameContent}
					style={{
						border: 'none',
						width: '100%',
						height: '100%',
					}}
				>
					<Animated
						animate={{ opacity: 1 }}
						initial={{ opacity: 0 }}
						transition={{ delay: 0.1 }}
					>
						<div onClick={() => handleOnClick(content)}>
							<div
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
		css={{
			position: 'absolute',
			top: 'clamp(100px, 500px, 40vh)',
			left: 7,
			background: 'rgba(0,0,0,0.3)',
			borderRadius: 99999,
			height: 60,
			width: 6,
			cursor: 'grab',
			'&:active': {
				cursor: 'grabbing',
			},
		}}
	/>
);

export default function Post({ post }) {
	const router = useRouter();
	const [x, setX] = React.useState(0);
	const width = `calc(90% - ${x}px)`;

	const dragGestures = useDrag((dp) => {
		const { dir } = dp.args[0];
		const multiplier = dir === 'left' ? 2 : -2;
		if (dp.dragging) {
			setX((prev) => prev + dp.delta[0] * multiplier);
		}
	});

	const handleOnClick = () => {
		copy(post.content, { format: 'text/plain' });
	};

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<div>
			<Head>
				<title>Patterns</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{router.isFallback ? (
				<div>Loading…</div>
			) : (
				<div>
					<VStack
						css={{ height: 80, padding: '8px 20px' }}
						alignment="center"
					>
						<Container>
							<HStack>
								<View>
									<Link href="/">
										<a>
											<Text>Patterns</Text>
										</a>
									</Link>
									<Heading>{post.title}</Heading>
								</View>
								<View>
									<Button
										variant="primary"
										onClick={handleOnClick}
									>
										Copy
									</Button>
								</View>
							</HStack>
						</Container>
					</VStack>
					<View
						css={{
							background: '#ddd',
							padding: '0 20px',
							height: 'calc(100vh - 80px)',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
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
									background: 'rgba(255,255,255,0.2)',
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
									borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
									borderRight: '1px solid rgba(0, 0, 0, 0.2)',
									height: '100%',
								}}
							>
								<ContentFrame {...post} />
							</View>
							<View
								css={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									right: -20,
									background: 'rgba(255,255,255,0.2)',
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
						</div>
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
