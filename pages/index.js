import {
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
import { getAllPatterns } from '../lib/api';
import { parse } from '@wordpress/block-serialization-default-parser';
import { FrameSnapshot, SEO, SiteFooter, ThemeSwitcher } from '../components';

const ContentFrame = ({ categories = [], content, slug, index, title }) => {
	const [category] = categories;
	const [isDragging, setIsDragging] = React.useState(false);

	const data = {
		type: 'inserter',
		blocks: parse(content.trim()),
		rawContent: content.trim(),
		contentSrc: 'use_patterns',
	};

	const handleOnDragStart = (event) => {
		setIsDragging(true);
		event.dataTransfer.setData('text', JSON.stringify(data));
	};

	const handleOnDragEnd = (event) => {
		setIsDragging(false);
	};

	return (
		<Animated
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 10 }}
			transition={{ delay: Math.min(0.06 * (index + 1), 0.6) }}
		>
			<VStack
				css={{ paddingBottom: 16 }}
				spacing={3}
				data-dragging={isDragging}
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
					<FrameSnapshot
						isDragging={isDragging}
						content={content}
						title={title}
					/>
				</a>

				<VStack spacing={0.5}>
					<Text weight={500} css={{ opacity: 0.5 }} size={12}>
						{category}
					</Text>
					<Heading size={4} weight={600} truncate>
						{title}
					</Heading>
				</VStack>
			</VStack>
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
