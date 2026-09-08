# Portfolio Sailboat Hover Design

## Goal

Make the small flag in the `egmn.dev` sailboat doodle turn orange when its project row is hovered or keyboard-focused.

## Design

- Keep the hull, sails, waves, icon container, and container border unchanged.
- Give the flag path a dedicated CSS class.
- On `.project-row` and `.project-item` hover or `:focus-within`, change only that path's stroke to `var(--color-accent)`.
- Animate the stroke color with the same understated timing used by the icon artwork.
- Keep the portfolio sailboat visible because `egmn.dev` has no separate real app icon.

## Accessibility and Responsive Behavior

Keyboard focus receives the same visual treatment as pointer hover. The interaction is identical on the homepage project row and the Projects page; touch layouts retain the default monochrome flag when no hover or focus state is active.

## Verification

- Add a source contract covering the flag class and all four hover/focus selectors.
- Run the complete test suite and production build.
- Verify the interaction in the local browser before merging to `main`.
