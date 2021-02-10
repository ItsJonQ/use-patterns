import { Animated } from '@wp-g2/components';
import copy from 'copy-to-clipboard';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { useAppTheme } from '../lib/appState';

const initialFrameContent = `
<!DOCTYPE html><html><head><link rel="stylesheet" href="/stylesheets/tachyons.css" /><link rel="stylesheet" href="/stylesheets/block-library-styles.css" /><link rel="stylesheet" href="/stylesheets/twentytwentyone.css" id="theme-stylesheet" /><style>body { pointer-events: none; display: flex; align-items: center; justify-content: center; min-height: 100vh; }  body > div { width: 100% }</style></head><body><div></div></body></html>
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

	const handleOnClick = () => {
		copy(content, { format: 'text/plain' });
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
						<div onClick={handleOnClick}>
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

export default ContentFrame;
