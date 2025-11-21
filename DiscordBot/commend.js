import { REST, Routes } from 'discord.js';
const commands = [
  {
    name: 'create',
    description: 'Create a new Short URL',
  },
];
const rest = new REST({ version: '10' }).setToken( "MTQzODQ3ODQ5MTM1NTE4NTE1Mg.GP1ZW5.sUnUHxL-x8sUxT9sxuPu6Ak-5gZG896n8VzTvc");

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1438478491355185152"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}