import prompts from 'prompts';
import { saveDecision } from '../storage.js';

export async function addCommand(): Promise<void> {
  console.log('\nRecord a decision\n');

  const response = await prompts([
    {
      type: 'text',
      name: 'title',
      message: 'What did you decide?',
      validate: (value: string) => value.trim() ? true : 'A title helps you find this later'
    },
    {
      type: 'text',
      name: 'problem',
      message: 'What problem were you solving?',
      validate: (value: string) => value.trim() ? true : 'Context matters — what prompted this?'
    },
    {
      type: 'text',
      name: 'constraints',
      message: 'Any constraints worth noting?',
      hint: 'optional'
    },
    {
      type: 'text',
      name: 'tradeoffs',
      message: 'What trade-offs did you accept?',
      hint: 'optional'
    }
  ], {
    onCancel: () => {
      console.log('\nDiscarded.\n');
      process.exit(0);
    }
  });

  // User cancelled via Ctrl+C
  if (!response.title || !response.problem) {
    return;
  }

  const filename = await saveDecision({
    title: response.title.trim(),
    problem: response.problem.trim(),
    constraints: response.constraints?.trim() || undefined,
    tradeoffs: response.tradeoffs?.trim() || undefined
  });

  console.log(`\nSaved to .why/${filename}\n`);
}
