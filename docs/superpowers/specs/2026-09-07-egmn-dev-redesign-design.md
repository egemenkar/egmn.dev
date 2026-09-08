# egmn.dev Editorial Redesign

## Goal

Redesign the existing Nuxt 3 portfolio into a warm, minimal, editorial homepage that clearly presents Egemen as a frontend lead and independent app maker. Preserve the current framework, verified content, localization setup, deployment configuration, and important routes. The supplied mockup defines the visual direction only and will not be embedded or reused as authentic product imagery.

## Chosen Approach

Implement a complete editorial redesign across the homepage and the existing About and Projects routes. Use the existing real portrait, verified external links, and real product assets obtained from existing repository sources or official product destinations. Do not generate or extract a portrait, app icon, or product screen from the mockup. If an optional real product image is unavailable, use a restrained typographic fallback and omit its preview control.

This approach gives the homepage the character of the approved reference while keeping the site factual, maintainable, and visually consistent across routes.

## Visual Direction

- Use an off-white light surface, near-black type, restrained orange accents, fine dividers, and generous whitespace.
- Provide an accessible dark theme with equivalent hierarchy and contrast.
- Use a compact text wordmark, editorial navigation, large naturally wrapping hero heading, real portrait, selected-work rows, concise career summary, and direct contact footer.
- Use the reference proportions as guidance rather than reproducing exact coordinates.
- Use a modern system sans stack and system monospace for labels and metadata. Avoid a new font dependency unless the existing project already includes one.
- Keep animation limited to short opacity, color, and transform transitions. Disable nonessential motion under `prefers-reduced-motion`.

## Architecture

The implementation remains a Nuxt 3 single-page application using Vue, Nuxt UI, Tailwind, and the existing i18n module. No backend, framework migration, new design-system package, or animation library will be introduced.

Shared responsibilities will be separated into focused components:

- `SiteHeader`: wordmark, section navigation, route-aware links, and theme control.
- `ThemeToggle`: accessible persisted light and dark mode using the existing Nuxt UI color-mode support.
- `IntroHero`: real portrait, headline, introduction, current role, and section calls to action.
- `SelectedWork`: selected project list and optional desktop preview area.
- `ProjectRow`: project icon or fallback, copy, destination link, hover/focus preview selection, and optional mobile preview control.
- `AboutSummary`: concise homepage experience rows and link to the full background.
- `ContactFooter`: verified contact methods, social links, and location.

Project, social, and experience data will live in one typed module so the homepage and detail routes do not duplicate factual content. Existing English localization remains active, and new visible copy will be placed in the English locale file.

## Homepage Behavior

The header links to `#work`, `#about`, and `#contact`. The logo links to the top. Navigation stays visible and compact on mobile rather than introducing a drawer.

The desktop hero uses a portrait-left, content-right composition. The final headline is `Probably working on something.` with its period in orange. It wraps naturally at each viewport without authored line breaks. Supporting copy reads `I’m Egemen, a frontend lead and independent app maker based in Istanbul.` and keeps `Currently leading frontend at The Despatch Company.` as the secondary line. The portrait-side handwritten note reads `Build. Ship. Repeat.` The existing `profile.jpg` remains the primary portrait. Mobile places a smaller portrait above the heading so the introduction remains visible without excessive scrolling.

Selected work contains Fomo Fast, RosterShift, and FlickMark in that order. Each row is independently keyboard accessible and links to a verified real destination. A desktop preview column appears only for products with a real screenshot. Hover and focus update that reserved preview region without changing layout height. Mobile uses a separate expandable Preview button only when a screenshot exists. The destination link always remains a distinct action, and no nested interactive elements are used.

The About section includes the supplied positioning statement and three factual experience rows: Head of Frontend at The Despatch Company, Senior Frontend Developer at The Despatch Company, and Frontend Developer at Rightyon. The complete existing work and education content remains available at `/about`.

The contact footer uses the repository's current email, GitHub, and LinkedIn destinations. An X link is included only if a verified destination is found. Location is shown as Istanbul, Türkiye. Its handwritten motto reads `Adjusting the sails.` beside a small line-drawn sailboat and wave doodle; the decorative composition stays compact on desktop and mobile.

## Detail Routes

`/about` and `/projects` remain functional and adopt the same tokens, header, spacing, typography, and footer language as the homepage. The About route preserves full verified experience and education. The Projects route preserves additional genuine projects while making the three selected apps prominent. No fabricated metrics, posts, dates, qualifications, or availability claims are added.

## Assets and Fallbacks

The existing portrait is used directly with explicit dimensions and eager loading above the fold. Product icons and screenshots may be added only from the repository or official product destinations after verifying their identity. Below-fold images are lazy loaded and stored in efficient formats where practical.

Fallback order for missing product imagery:

1. Official real icon or screenshot.
2. Existing repository asset.
3. Restrained typographic monogram for an icon.
4. No preview control when a real screenshot is unavailable.

The supplied mockup remains a private visual reference and is not copied into the public site.

## Theme, Accessibility, and Failure Handling

First-time visitors see the light theme. Explicit choices persist through the existing color-mode mechanism. The theme button exposes the action it performs and a visible keyboard focus state.

The page uses semantic landmarks, one homepage `h1`, logical headings, descriptive links, alt text for meaningful images, hidden decorative marks, and practical 44-pixel control targets. All content remains available if JavaScript-controlled previews fail. Missing optional media does not render broken images or empty controls. External links use safe target and relationship attributes.

No fixed-height text boxes or decorative elements may create horizontal overflow at 320 pixels. Reduced-motion mode removes image tilts and animated crossfades while retaining content and controls.

## Metadata and Performance

Preserve the existing canonical hostname and static deployment behavior. Set the homepage title to `Egemen Kar | Frontend Lead & App Maker` and description to `Frontend lead and independent app maker based in Istanbul. Explore my apps, work, and ideas.` Add standard social metadata where it can use verified assets.

Avoid unnecessary runtime dependencies and large image payloads. The production build should remain statically deployable. The target is Lighthouse mobile Performance and Accessibility at 90 or above when measurable, CLS below 0.1, and LCP below 2.5 seconds under documented test conditions; results will only be reported if actually measured.

## Verification

Verification will include:

- Production `npm run build` and `npm run generate` where compatible with the repository.
- Browser inspection at 1440-pixel desktop and 390-pixel mobile widths, plus a 320-pixel overflow check.
- Light and dark theme checks.
- Keyboard navigation and focus checks for navigation, theme control, project destinations, and preview controls.
- Reduced-motion and console-error checks.
- Verification that product, social, and contact destinations are real and do not use guessed placeholders.
- Visual comparison with the supplied mockup for hierarchy, spacing, color, and overall editorial character.

## Delivery Boundary

Implementation, validation, and a local preview are in scope. Production deployment, domain changes, third-party account changes, and pushing or merging to `main` are not in scope. Work remains on `codex/egmn-redesign` until Egemen reviews the local result and separately authorizes integration.
