import Head from 'next/head';
import { Heading, Text, VStack, View, Animated } from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import copy from 'copy-to-clipboard';
import Frame, { FrameContextConsumer } from 'react-frame-component';

const initialFrameContent = `
<!DOCTYPE html><html><head><link rel="stylesheet" href="/stylesheets/tachyons.css" /><link rel="stylesheet" href="/stylesheets/block-library-styles.css" /><link rel="stylesheet" href="/stylesheets/tt1.css" /><style>body { display: flex; min-height: 100vh; align-items: center; justify-content: center; }</style></head><body><div></div></body></html>
`;

const pattern = `
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"10vh","bottom":"10vh"}}}} -->
<div class="wp-block-group alignwide" style="padding-top:10vh;padding-bottom:10vh"><div class="wp-block-group__inner-container"><!-- wp:paragraph {"align":"center","fontSize":"extra-small"} -->
<p class="has-text-align-center has-extra-small-font-size o-40 mb3"><strong>TRANSACTIONS</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","fontSize":"extra-large"} -->
<h2 class="has-text-align-center has-extra-large-font-size mt0"><strong>A better way to send money</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
<p class="has-text-align-center has-small-font-size o-70 my0">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":20} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Competitive exchange rates</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">No hidden fees</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Transfers are instant</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Mobile notifications</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:group -->
`;

const pattern2 = `
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"10vh","bottom":"10vh"}}}} -->
<div class="wp-block-group alignwide" style="padding-top:10vh;padding-bottom:10vh"><div class="wp-block-group__inner-container">\

<!-- wp:heading {"textAlign":"center","fontSize":"extra-large"} -->
<h2 class="has-text-align-center has-extra-large-font-size mt0"><strong>A better way to send money</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
<p class="has-text-align-center has-small-font-size o-70 my0">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":20} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Transfer funds worldwide</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":20} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"level":4} -->
<h4 class="mb3">Competitive Rates</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size o-70 mt0 mb3">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4 class="mb3">No Hidden Fees</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size o-70 mt0 mb3">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4 class="mb3">Instant Transfers</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size o-70 mt0 mb3">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->


<!-- wp:column -->
<div class="wp-block-column"><!-- wp:image {"align":"center","id":52,"width":345,"height":620,"sizeSlug":"large","linkDestination":"none"} -->
<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img src="http://localhost:8888/wordpress/wp-content/uploads/2021/02/Screen-Shot-2021-02-07-at-10.19.27-AM-570x1024.png" alt="" class="wp-image-52" width="345" height="620"/></figure></div>
<!-- /wp:image --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:group -->
`;

const pattern3 = `
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"10vh","bottom":"10vh"}}}} -->
<div class="wp-block-group alignwide" style="padding-top:10vh;padding-bottom:10vh">
<div class="wp-block-group__inner-container">\


<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:image {"align":"center","id":52,"width":345,"height":620,"sizeSlug":"large","linkDestination":"none"} -->
<div class="wp-block-image"><figure class="aligncenter size-large is-resized"><img src="http://localhost:8888/wordpress/wp-content/uploads/2021/02/Screen-Shot-2021-02-07-at-10.19.27-AM-570x1024.png" alt="" class="wp-image-52" width="345" height="620"/></figure></div>
<!-- /wp:image -->
</div>
<!-- /wp:column -->

<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%"><!-- wp:heading {"level":4} -->
<!-- wp:heading {"level":4} -->
<h4 class="mb3">Competitive Rates</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size o-70 mt0 mb3">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4 class="mb3">No Hidden Fees</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size o-70 mt0 mb3">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4 class="mb3">Instant Transfers</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"extra-small"} -->
<p class="has-extra-small-font-size o-70 mt0 mb3">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->


</div>
<!-- /wp:columns --></div></div>
<!-- /wp:group -->
`;

const pattern4 = `
<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"10vh","bottom":"10vh"}}}} -->
<div class="wp-block-group alignwide" style="padding-top:10vh;padding-bottom:10vh"><div class="wp-block-group__inner-container"><!-- wp:paragraph {"align":"center","fontSize":"extra-small"} -->
<p class="has-text-align-center has-extra-small-font-size o-40 mb3"><strong>TRANSACTIONS</strong></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","fontSize":"extra-large"} -->
<h2 class="has-text-align-center has-extra-large-font-size mt0"><strong>A better way to send money</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
<p class="has-text-align-center has-small-font-size o-70 my0">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":20} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide">

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Cloud sync</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Calendars</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Email</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"fontSize":"small"} -->
<p class="has-small-font-size o-70 mt0 mb3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":4} -->
<h4 class="mb3">Analytics</h4>
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

const ContentFrame = ({ content }) => {
	const handleOnClick = (p) => {
		copy(p, { format: 'text/plain' });
	};
	const wrapperRef = React.useRef();
	const [frameHeight, setFrameHeight] = React.useState('100%');
	const [frameDocument, setFrameDocument] = React.useState();
	const [frameScale, setFrameScale] = React.useState(0.3125);

	React.useEffect(() => {
		const handleOnResize = () => {
			setFrameHeight(wrapperRef.current.clientWidth);
			setFrameScale(wrapperRef.current.clientWidth / 1280);
		};

		handleOnResize();

		window.addEventListener('resize', handleOnResize);

		return () => {
			window.addEventListener('resize', handleOnResize);
		};
	}, [frameDocument]);

	return (
		<div
			ref={wrapperRef}
			style={{
				width: '100%',
				height: frameHeight,
				display: 'inline-block',
				overflow: 'hidden',
				lineHeight: 0,
				verticalAlign: 'middle',
				cursor: 'pointer',
			}}
		>
			<Animated
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				transition={{ delay: 0.1 }}
				whileHover={{ opacity: 0.7 }}
			>
				<Frame
					initialContent={initialFrameContent}
					style={{
						border: 'none',
						width: '1280px',
						height: '1280px',
						transform: `scale(${frameScale})`,
						transformOrigin: 'top left',
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
								style={{
									pointerEvents: 'none',
									userSelect: 'none',
								}}
							/>
						</div>
					</Animated>

					<FrameContextConsumer>
						{({ document, window }) => {
							// Render Children
							setFrameDocument(document);
						}}
					</FrameContextConsumer>
				</Frame>
			</Animated>
		</div>
	);
};

export default function Home() {
	const handleOnDragStart = (event) => {
		event.dataTransfer.setData('text/plain', 'hello');
	};
	const handleOnClick = (p) => {
		copy(p, { format: 'text/plain' });
	};
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
				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fill, minmax(480px, 1fr))',
						gridGap: 20,
					}}
				>
					<ContentFrame content={pattern} />
					<ContentFrame content={pattern2} />
					<ContentFrame content={pattern3} />
					<ContentFrame content={pattern4} />
				</div>
			</div>
		</View>
	);
}
