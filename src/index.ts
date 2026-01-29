#!/usr/bin/env node

import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { showCommand } from './commands/show.js';

const HELP = `
why - Record technical decisions

Usage:
  why add           Record a new decision interactively
  why list          List all recorded decisions
  why show <n>      Show decision by number or filename
  why --help        Show this help message

Examples:
  why add                    # Start interactive prompt
  why list                   # See all decisions
  why show 1                 # Show most recent decision
  why show 2024-01-29-use-postgres.md
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
      await addCommand();
      break;

    case 'list':
    case 'ls':
      await listCommand();
      break;

    case 'show':
    case 'view':
      await showCommand(args[1]);
      break;

    case '--help':
    case '-h':
    case 'help':
    case undefined:
      console.log(HELP);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP);
      process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
