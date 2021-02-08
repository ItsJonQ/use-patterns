import Head from 'next/head';
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
import Link from 'next/link';
import { useDrag } from 'react-use-gesture';

const initialFrameContent = `
<!DOCTYPE html><html><head><link rel="stylesheet" href="/stylesheets/tachyons.css" /><link rel="stylesheet" href="/stylesheets/block-library-styles.css" /><link rel="stylesheet" href="/stylesheets/tt1.css" /><style>body { padding: 20px; pointer-events: none; }</style></head><body><div></div></body></html>
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
	const [x, setX] = React.useState(0);
	const width = `calc(100% - ${x}px)`;

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

	return (
		<div>
			<Head>
				<title>Patterns</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="preload"
					as="style"
					href="/stylesheets/tachyons.css"
				/>
				<link
					rel="preload"
					as="style"
					href="/stylesheets/block-library-styles.css"
				/>
				<link rel="preload" as="style" href="/stylesheets/tt1.css" />
			</Head>

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
		</div>
	);
}

const patternContent = `
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"10vh","bottom":"10vh"}}}} -->
<div class="wp-block-group alignwide" style="padding-top:10vh;padding-bottom:10vh">

<div class="wp-block-group__inner-container"><!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">

<!-- wp:heading {"fontSize":"80px","lineHeight":"1.1"} -->
<h2 class="mt0" style="font-size:80px;line-height:1.1"><strong>A better way to build</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"large","lineHeight":"1.6"} -->
<p class="has-large-font-size o-70 my0" style="line-height:1.6">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:image {"align":"center","sizeSlug":"large"} -->
<div class="wp-block-image"><figure class="aligncenter size-large"><img src="https://images.unsplash.com/photo-1612698565524-1101522e9a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt=""/></figure></div>
<!-- /wp:image -->

</div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":20} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:separator -->
<hr class="wp-block-separator o-30"/>
<!-- /wp:separator -->

<!-- wp:spacer {"height":20} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->


<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Responsive</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Themable</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Customizable</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div></div>
<!-- /wp:group -->
`;

const post = {
	title: 'Test Pattern',
	content: patternContent,
};

export async function getStaticProps() {
	return {
		props: {
			post,
		},
	};
}
