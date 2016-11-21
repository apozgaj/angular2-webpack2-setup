/*
 * Executes 'npm run ngc' passing all parameters passed to the script.
 * 
 * If TRANSLATION_FILE and LOCALE_ID environment variables are defined
 * extra arguments are passed to ngc :
 *    --i18nFile=TRANSLATION_FILE
 *    --locale=LOCALE_ID
 *    --i18nFormat="xlf"
 */
const exec = require('child_process').exec;

let TRANSLATION_FILE = process.env.TRANSLATION_FILE;
let LOCALE_ID = process.env.LOCALE_ID;

let args = process.argv.slice(2);

if (TRANSLATION_FILE && LOCALE_ID) {
  args.push(
    `--i18nFile="locale/${TRANSLATION_FILE}"`,
    `--locale="${LOCALE_ID}"`,
    `--i18nFormat="xlf"`);
}

let command = 'npm run ngc -- ' + args.join(' ');
console.log(command);
exec(command);