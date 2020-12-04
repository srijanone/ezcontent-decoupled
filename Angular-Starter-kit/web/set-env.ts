const fs = require('fs');

// Configure Angular `environment.ts` file path

// Load node modules
const colors = require('colors');

require('dotenv').config({ path: '../.env' });

let targetPath = './src/environments/environment.ts';

if(process.env.PROD) {
    targetPath = './src/environments/environment.prod.ts';
}

// `environment.ts` file structure
const envConfigFile = `export const environment = {
    apiHost: '${process.env.API_HOST}',
    drupalHost: '${process.env.DRUPAL_HOST}',
    nodeEnv: '${process.env.NODE_ENV}',
    googleAnalytics: '${process.env.GOOGLE_ANALYTICS}',
    production: ${process.env.PROD},
    username: '${process.env.USERNAME}',
    password: '${process.env.PASSWORD}',
    clientSecret: '${process.env.CLIENTSECRET}',
    clientId: '${process.env.CLIENTID}'
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile, function (err) {
   if (err) {
       throw console.error(err);
   } else {
       console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
   }
});