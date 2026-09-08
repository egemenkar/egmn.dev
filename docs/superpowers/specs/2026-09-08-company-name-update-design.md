# Company Name Update Design

## Goal

Use `The Despatch Company` consistently everywhere the employer is named in the portfolio repository.

## Scope

- Update the homepage secondary line.
- Update every work-experience company label.
- Update source contracts and content tests.
- Update existing design and implementation documentation so repository search is consistent.
- Preserve roles, dates, locations, links, layout, and styling.

## Verification

The test suite must require `The Despatch Company` in homepage and experience content and reject any remaining legacy company-name occurrence. The production build must succeed, and the deployed homepage and About page must show the new company name after `main` is pushed.
