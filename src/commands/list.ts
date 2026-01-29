import { listDecisions } from '../storage.js';

export async function listCommand(): Promise<void> {
  const decisions = await listDecisions();

  if (decisions.length === 0) {
    console.log('\nNo decisions yet.\n');
    console.log('  Run `why add` to record one.\n');
    return;
  }

  const count = decisions.length;
  const indexWidth = String(count).length;

  console.log('');

  decisions.forEach((decision, i) => {
    const num = String(i + 1).padStart(indexWidth, ' ');
    console.log(`  ${num}. ${decision.date}  ${decision.title}`);
  });

  console.log('');
  console.log(`  ${count} decision${count === 1 ? '' : 's'}. Use \`why show <n>\` to view.\n`);
}
