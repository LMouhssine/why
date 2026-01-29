import prompts from 'prompts';
import { saveDecision } from '../storage.js';

export async function addCommand(): Promise<void> {
  const response = await prompts([
    {
      type: 'text',
      name: 'title',
      message: 'Decision title:',
      validate: (value: string) => value.trim() ? true : 'Title is required'
    },
    {
      type: 'text',
      name: 'problem',
      message: 'What problem were you solving?',
      validate: (value: string) => value.trim() ? true : 'Problem description is required'
    },
    {
      type: 'text',
      name: 'constraints',
      message: 'What constraints influenced this decision? (optional)'
    },
    {
      type: 'text',
      name: 'tradeoffs',
      message: 'What trade-offs did you accept? (optional)'
    }
  ], {
    onCancel: () => {
      console.log('\nCancelled.');
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

  console.log(`\nDecision saved: .why/${filename}`);
}
