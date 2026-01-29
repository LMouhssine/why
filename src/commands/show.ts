import { listDecisions, getDecision } from '../storage.js';

export async function showCommand(identifier: string): Promise<void> {
  if (!identifier) {
    console.log('\nUsage: why show <number>\n');
    console.log('  Example: why show 1\n');
    process.exit(1);
  }

  // Check if identifier is a number (1-based index)
  const index = parseInt(identifier, 10);

  if (!isNaN(index) && index > 0) {
    const decisions = await listDecisions();

    if (decisions.length === 0) {
      console.log('\nNo decisions yet. Run `why add` to record one.\n');
      process.exit(1);
    }

    if (index > decisions.length) {
      const s = decisions.length === 1 ? '' : 's';
      console.log(`\nOnly ${decisions.length} decision${s} recorded. Try \`why show 1\`.\n`);
      process.exit(1);
    }

    const decision = decisions[index - 1];
    console.log('');
    console.log(decision.content);
    return;
  }

  // Otherwise treat as filename
  let filename = identifier;
  if (!filename.endsWith('.md')) {
    filename += '.md';
  }

  const decision = await getDecision(filename);

  if (!decision) {
    console.log(`\nDecision not found: ${identifier}\n`);
    console.log('  Run `why list` to see available decisions.\n');
    process.exit(1);
  }

  console.log('');
  console.log(decision.content);
}
