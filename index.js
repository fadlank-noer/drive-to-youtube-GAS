import { text, cancel, confirm, spinner } from '@clack/prompts';
import { generateGSFile } from './src/templating.cjs';

async function main() {
  console.clear();

  const readyFolderId = await text({
    message: 'Ready Folder ID?',
    placeholder: 'Enter Ready Folder ID...',
    validate: (value) => {
      if (!value) return 'Folder ID cannot be empty!';
    }
  });

  if (typeof readyFolderId !== 'string') {
    cancel('Operation cancelled');
    process.exit(0);
  }

  const archiveFolderId = await text({
    message: 'Archive Folder ID?',
    placeholder: 'Enter Archive Folder ID...',
    validate: (value) => {
      if (!value) return 'Folder ID cannot be empty!';
    }
  });

  if (typeof archiveFolderId !== 'string') {
    cancel('Operation cancelled');
    process.exit(0);
  }

  const isScheduled = await confirm({
    message: 'Schedule upload?',
    initialValue: false
  });

  let hourlyAt = '';

  if (isScheduled) {
    hourlyAt = await text({
      message: 'How many hours after execution? (1-12)',
      placeholder: 'Enter number 1-12...',
      validate: (value) => {
        const num = parseInt(value);
        if (!value || isNaN(num) || num < 1 || num > 12) {
          return 'Please enter a number between 1-12!';
        }
      }
    });

    if (typeof hourlyAt !== 'string') {
      cancel('Operation cancelled');
      process.exit(0);
    }
  }

  // Preview inputs
  console.log('\n=== Preview ===');
  console.log(`Ready Folder ID: ${readyFolderId}`);
  console.log(`Archive Folder ID: ${archiveFolderId}`);
  console.log(`Scheduled: ${isScheduled ? 'Yes' : 'No'}`);
  if (isScheduled) {
    console.log(`Upload after: ${hourlyAt} hour(s)`);
  }
  console.log('');

  const proceed = await confirm({
    message: 'Proceed?',
    initialValue: true
  });

  if (!proceed) {
    cancel('Cancelled by user');
    process.exit(0);
  }

  // Generate output file
  const s = spinner();
  s.start('Generating output.gs...');

  try {
    const config = {
      readyFolderId,
      archiveFolderId,
      isScheduled,
      hourlyAt
    };
    const outputPath = await generateGSFile(config);
    s.stop(`File generated: ${outputPath}`);
  } catch (error) {
    s.stop('Error generating file');
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);

