import { userTable } from '#/db/schema';
import hashString from '#/utils/hash';
import { getTableName } from 'drizzle-orm';
import * as readline from 'readline';

function escapeSqlString(str: string): string {
  return str.replace(/'/g, "''");
}

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function askPassword(query: string): Promise<string> {
  return new Promise<string>((resolve) => {
    process.stdout.write(query);
    let password = '';

    process.stdin.resume();
    process.stdin.setRawMode(true);

    function onData(chunk: Buffer) {
      const input = chunk.toString('utf8');
      for (const char of input) {
        if (char === '\r' || char === '\n') {
          process.stdout.write('\n');
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.removeListener('data', onData);
          return resolve(password);
        } else if (char === '\u0003') {
          process.exit();
        } else if (char === '\u007F') {
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(query + '*'.repeat(password.length));
          }
        } else {
          password += char;
          process.stdout.write('*');
        }
      }
    }

    process.stdin.on('data', onData);
  });
}

async function main() {
  const email = await askQuestion('email: ');
  const password = await askPassword('password: ');
  const sql = `INSERT INTO ${getTableName(userTable)} (email, password_hash) VALUES ('${escapeSqlString(email)}', '${escapeSqlString(hashString(password))}');`;

  console.log('\ngenerated SQL:');
  console.log(sql);
}

main();
