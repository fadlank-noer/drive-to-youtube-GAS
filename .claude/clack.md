# This Is Guide for NPM Package "@clack/prompts"

Quick Start
Here’s a simple example to get you started:

import { text, select, confirm, isCancel } from '@clack/prompts';

async function main() {
  // Get user's name
  const name = await text({
    message: 'What is your name?',
    placeholder: 'John Doe',
  }) as string;

  // Get user's preferred framework
  const framework = await select({
    message: 'Choose a framework:',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  });

  if (isCancel(framework)) {
    console.log('Operation cancelled');
    process.exit(0);
  }

  // Confirm the selection
  const shouldProceed = await confirm({
    message: `Create a ${framework} project for ${name}?`,
  });

  if (shouldProceed) {
    console.log('Creating project...');
  }
}

Core Concepts
High-Level Components
Clack provides several high-level components that make it easy to build interactive CLIs:

text() - For text input with validation
password() - For secure password input with masking
select() - For selection menus
selectKey() - For choosing an option by pressing its key
confirm() - For yes/no confirmations
multiselect() - For multiple selections
groupMultiselect() - For grouped multiple selections
autocomplete() - For searchable selection menus
path() - For file/directory path selection with autocomplete
date() - For structured date entry (YMD / MDY / DMY)
note() - For displaying information
box() - For boxed text display
spinner() - For loading states
progress() - For progress bar display
tasks() - For sequential task execution
taskLog() - For log output that clears on success
stream - For multi-line streamed output (async iterators, readable streams)