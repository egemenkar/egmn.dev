# egmn.dev

Personal site of Egemen Kar, Head of Frontend. Built with Nuxt 3 and fully prerendered to static HTML.

## Updating content

All copy lives in [`data/profile.ts`](data/profile.ts): positioning, about, focus areas, experience, education, links and writing. Components never need to change for a content update.

- **Menu:** the home page is a terminal-style menu; its items and hints are `sections` in `data/profile.ts`.
- **Writing:** add entries to `posts` (newest first). The Writing section, the `/writing` page, the nav link and the sitemap entry appear automatically once there is at least one post.
- **Social card and icons:** after changing the name or headline, run `npm run images` (needs a local Chrome) to regenerate `public/og-image.png` and the favicons. New banner letters go in `utils/pixel-font.ts`.
- **CV PDF:** edit `cv/cv.html`, then run `npm run cv` (needs a local Chrome) to rebuild `public/egemen-kar-cv.pdf`. The public CV deliberately has no phone number.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm test
npm run generate   # static output in .output/public
```

## License

[MIT](https://choosealicense.com/licenses/mit/). JetBrains Mono is self-hosted under the SIL Open Font License (see `public/fonts`).
