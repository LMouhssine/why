import { listDecisions } from '../storage.js';

export async function listCommand(): Promise<void> {
  const decisions = await listDecisions();

  if (decisions.length === 0) {
    console.log('No decisions recorded yet.');
    console.log('Use "why add" to record your first decision.');
    return;
  }

  console.log('Decisions:\n');

  decisions.forEach((decision, index) => {
    console.log(`  ${index + 1}. [${decision.date}] ${decision.title}`);
  });

  console.log(`\nUse "why show <number>" to view details.`);
}
