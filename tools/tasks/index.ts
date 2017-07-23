import { readdirSync } from 'fs';
import { join } from 'path';

readdirSync(join(__dirname, 'seed')).forEach(file => require('./seed/' + file));
readdirSync(join(__dirname, 'project')).forEach(file => require('./project/' + file));
