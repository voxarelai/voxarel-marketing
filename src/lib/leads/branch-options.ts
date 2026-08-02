/**
 * The branch-count options, shared by the demo form (client) and the lead
 * schema (server). Kept in its own zod-free module so importing it into the
 * client does not pull zod into the /demo bundle. Plain hyphens, not en dashes.
 */
export const BRANCH_OPTIONS = ["Just one", "2-5", "6-15", "More than 15"] as const;
