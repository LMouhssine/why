import { listDecisions, getDecision } from '../storage.js';

export async function showCommand(identifier: string): Promise<void> {
  if (!identifier) {
    console.error('Usage: why show <number|filename>');
    console.error('Example: why show 1');
    process.exit(1);
  }

  // Check if identifier is a number (1-based index)
  const index = parseInt(identifier, 10);

  if (!isNaN(index) && index > 0) {
    const decisions = await listDecisions();

    if (index > decisions.length) {
      console.error(`Decision #${index} not found. Only ${decisions.length} decision(s) exist.`);
      process.exit(1);
    }

    const decision = decisions[index - 1];
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
    console.error(`Decision "${identifier}" not found.`);
    process.exit(1);
  }

  console.log(decision.content);
}
