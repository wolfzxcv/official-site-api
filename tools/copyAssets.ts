import * as shell from 'shelljs';

// Copy all the view templates
shell.cp('-R', 'src/views', 'dist/src/views');

//Copy all the template content
shell.cp('-R', 'src/template', 'dist/src/');
