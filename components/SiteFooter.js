import { Container, HStack, Text, Link, View } from '@wp-g2/components';

export default function SiteFooter() {
	const year = new Date().getFullYear();
	return (
		<Container css={{ padding: '10vh 20px' }}>
			<HStack>
				<View>
					<Text weight={500}>
						© {year} Patterns. Built by{' '}
						<Link href="https://jonquach.com/" weight={500}>
							Q
						</Link>
						.
					</Text>
				</View>
			</HStack>
		</Container>
	);
}
