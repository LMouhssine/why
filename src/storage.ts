import { mkdir, writeFile, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { generateSlug, formatDate } from './utils.js';

const WHY_DIR = '.why';

export interface Decision {
  title: string;
  problem: string;
  constraints?: string;
  tradeoffs?: string;
}

export interface StoredDecision {
  filename: string;
  date: string;
  title: string;
  content: string;
}

/**
 * Ensure .why/ directory exists
 */
export async function ensureWhyDir(): Promise<void> {
  if (!existsSync(WHY_DIR)) {
    await mkdir(WHY_DIR, { recursive: true });
  }
}

/**
 * Generate markdown content from a decision
 */
function generateMarkdown(decision: Decision, date: string): string {
  let content = `# ${decision.title}\n\n`;
  content += `**Date:** ${date}\n\n`;
  content += `## Problem\n\n${decision.problem}\n`;

  if (decision.constraints) {
    content += `\n## Constraints\n\n${decision.constraints}\n`;
  }

  if (decision.tradeoffs) {
    content += `\n## Trade-offs\n\n${decision.tradeoffs}\n`;
  }

  return content;
}

/**
 * Save a decision to a markdown file
 * Returns the filename
 */
export async function saveDecision(decision: Decision): Promise<string> {
  await ensureWhyDir();

  const date = formatDate(new Date());
  const slug = generateSlug(decision.title);
  const filename = `${date}-${slug}.md`;
  const filepath = join(WHY_DIR, filename);

  const content = generateMarkdown(decision, date);
  await writeFile(filepath, content, 'utf-8');

  return filename;
}

/**
 * Parse a decision filename to extract date and title
 */
function parseFilename(filename: string): { date: string; title: string } | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (!match) return null;

  const date = match[1];
  const slug = match[2];
  // Convert slug back to title (rough approximation)
  const title = slug.replace(/-/g, ' ');

  return { date, title };
}

/**
 * List all decisions, sorted newest first
 */
export async function listDecisions(): Promise<StoredDecision[]> {
  await ensureWhyDir();

  const files = await readdir(WHY_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const decisions: StoredDecision[] = [];

  for (const filename of mdFiles) {
    const parsed = parseFilename(filename);
    if (!parsed) continue;

    const filepath = join(WHY_DIR, filename);
    const content = await readFile(filepath, 'utf-8');

    // Extract actual title from markdown (first # heading)
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : parsed.title;

    decisions.push({
      filename,
      date: parsed.date,
      title,
      content
    });
  }

  // Sort by date descending (newest first)
  decisions.sort((a, b) => b.date.localeCompare(a.date));

  return decisions;
}

/**
 * Get a single decision by filename
 */
export async function getDecision(filename: string): Promise<StoredDecision | null> {
  await ensureWhyDir();

  const filepath = join(WHY_DIR, filename);

  if (!existsSync(filepath)) {
    return null;
  }

  const content = await readFile(filepath, 'utf-8');
  const parsed = parseFilename(filename);

  if (!parsed) return null;

  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : parsed.title;

  return {
    filename,
    date: parsed.date,
    title,
    content
  };
}
