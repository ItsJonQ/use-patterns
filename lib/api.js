import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const POSTS_DIR = '_posts';
const PAGES_DIR = '_pages';
const PATTERNS_DIR = '_patterns';

export function getSlugsFromDir(directory = POSTS_DIR) {
	const dirName = join(process.cwd(), directory);
	return fs.readdirSync(dirName);
}

export function getPostFileBySlugFromDir(
	directory = POSTS_DIR,
	slug,
	fields = []
) {
	const postFilesDirectory = join(process.cwd(), directory);

	const realSlug = slug.replace(/\.md$/, '');
	const fullPath = join(postFilesDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content, excerpt } = matter(fileContents);

	const props = {
		description: data.description || '',
		id: realSlug,
		date: data.date || '',
	};

	// Ensure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === 'slug') {
			props[field] = realSlug;
		}

		if (field === 'content') {
			props[field] = content;
		}

		if (data[field]) {
			props[field] = data[field];
		}
	});

	return props;
}

export function getAllPostsFromDir(dir = POSTS_DIR, fields = []) {
	const slugs = getSlugsFromDir(dir);
	const posts = slugs
		.map((slug) => getPostFileBySlugFromDir(dir, slug, fields))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'));
	return posts;
}

export function getPostBySlug(slug, fields = []) {
	return getPostFileBySlugFromDir(POSTS_DIR, slug, fields);
}

export function getPageBySlug(slug, fields = []) {
	return getPostFileBySlugFromDir(PAGES_DIR, slug, fields);
}

export function getPatternBySlug(slug, fields = []) {
	return getPostFileBySlugFromDir(PATTERNS_DIR, slug, fields);
}

export function getAllPosts(fields = []) {
	return getAllPostsFromDir(POSTS_DIR, fields);
}

export function getAllPages(fields = []) {
	return getAllPostsFromDir(PAGES_DIR, fields);
}

export function getAllPatterns(fields = []) {
	return getAllPostsFromDir(PATTERNS_DIR, fields);
}
