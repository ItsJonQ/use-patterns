import {
	Button,
	Container,
	Elevation,
	Heading,
	HStack,
	Spacer,
	Surface,
	Text,
	View,
	VStack,
} from '@wp-g2/components';
import { styled } from '@wp-g2/styles';
import copy from 'copy-to-clipboard';
import { ContentFrame, SEO, ThemeSwitcher } from '../components';
import Link from 'next/link';
import { parse } from '@wordpress/block-serialization-default-parser';
import { useDrag } from 'react-use-gesture';

const DragHandleContainerLeft = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.08);
	left: -20px;
	width: 20px;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
`;

const DragHandleContainerRight = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.08);
	right: -20px;
	width: 20px;
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
`;

const DragHandle = styled.button`
	appearance: none;
	background: rgba(255, 255, 255, 0.2);
	border-radius: 99999px;
	border: none;
	cursor: grab;
	height: 60px;
	left: 7px;
	outline: none;
	padding: 0;
	position: absolute;
	top: clamp(100px, 500px, 40vh);
	width: 6px;

	*:hover > & {
		background: rgba(255, 255, 255, 0.3);
	}
	*:active > & {
		cursor: grabbing;
		background: rgba(255, 255, 255, 0.5);
	}
`;

const ContentFrameWrapper = styled.div`
	border-left: 1px solid rgba(0, 0, 0, 0.04);
	border-right: 1px solid rgba(0, 0, 0, 0.04);
	height: 100%;
	position: relative;
	z-index: 1;
`;

const ViewportWrapper = styled.div`
	background: #111;
	padding: 0 20px;
	height: calc(100vh - 70px);
	overflow: hidden;
`;

const Viewport = styled.div`
	margin: auto;
	min-width: 320px;
	position: relative;
	max-width: 100%;
	height: 100%;
`;

function AppHeader({ content, title }) {
	const data = {
		type: 'inserter',
		blocks: parse(content.trim()),
		rawContent: content.trim(),
		contentSrc: 'use_patterns',
	};

	const handleOnDragStart = (event) => {
		event.dataTransfer.setData('text', JSON.stringify(data));
	};

	const handleOnClick = () => {
		copy(content, { format: 'text/plain' });
	};

	return (
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
									<Text weight={600} variant="muted">
										Patterns
									</Text>
								</a>
							</Link>
							<Heading size={4}>{title}</Heading>
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
	);
}

export default function Post({ post }) {
	const [x, setX] = React.useState(0);
	const width = `calc(100% - ${x}px)`;
	const frameContainerRef = React.useRef();

	const dragGestures = useDrag((dp) => {
		const { dir } = dp.args[0];
		const multiplier = dir === 'left' ? 2 : -2;
		if (dp.dragging) {
			setX((prev) => prev + dp.delta[0] * multiplier);
		}
	});

	return (
		<>
			<SEO title={post.title} />
			<AppHeader {...post} />
			<ViewportWrapper>
				<Viewport style={{ width }}>
					<DragHandleContainerLeft {...dragGestures({ dir: 'left' })}>
						<DragHandle title="Drag to resize" />
					</DragHandleContainerLeft>
					<ContentFrameWrapper ref={frameContainerRef}>
						<ContentFrame {...post} />
					</ContentFrameWrapper>
					<DragHandleContainerRight
						{...dragGestures({ dir: 'right' })}
					>
						<DragHandle title="Drag to resize" />
					</DragHandleContainerRight>
				</Viewport>
			</ViewportWrapper>
		</>
	);
}

const patternContent = `
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"20vh","bottom":"20vh"}}}} -->
<div class="wp-block-group alignwide" style="padding-top:20vh;padding-bottom:20vh">

<div class="wp-block-group__inner-container">

<!-- wp:heading {"textAlign":"center"} -->
<h2 class="f1 f-5-m f-6-l mt0 lh-solid has-text-align-center"><strong>Think.<br />Design.<br />Build.</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"textAlign":"center"} -->
<p class="o-70 my0 has-text-align-center">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

</div>
</div>
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
