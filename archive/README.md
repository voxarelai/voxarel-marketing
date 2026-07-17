# Archive

## voxarel-marketing-v1/

The original Voxarel marketing site design (dark theme, `#09090b` background, orange `#f97316` accent, Inter + Playfair Display, Three.js visualizations), replaced by the redesigned site in July 2026.

This is a complete, standalone copy — reusable elsewhere as-is (`npm install && npm run dev` inside the folder). It includes the final work-in-progress features that never shipped: CalculatorWidget, LeadsPortal page, PlatformBridge, and the 50k-kgs milestone social assets.

Also preserved in git:
- Tag `v1-design` and branch `archive/v1-design` (both pushed to GitHub) point at the last v1 commit.

This folder is excluded from the live site's build (`tsconfig.json` `exclude` + `@source not` in `globals.css`). Do not edit it as part of the live site.
