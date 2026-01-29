#!/usr/bin/env node

import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { showCommand } from './commands/show.js';

const HELP = `
why — record technical decisions

Commands:
  why add         Record a new decision
  why list        List all decisions
  why show <n>    View a decision by number

Examples:
  why add
  why list
  why show 1
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add':
    case 'new':
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
      console.log(HELP);
      break;

    case undefined:
      await listCommand();
      break;

    default:
      console.log(`\nUnknown command: ${command}\n`);
      console.log('Run `why --help` for usage.\n');
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(`\nError: ${error.message}\n`);
  process.exit(1);
});
