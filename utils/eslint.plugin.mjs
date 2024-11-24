import { resolve, relative, sep } from 'node:path';
import { createFilter } from '@rollup/pluginutils';
import { ESLint } from 'eslint';

function normalizePath(id) {
    return relative(process.cwd(), id).split(sep).join('/');
}
function eslint(options = {}) {
    if (typeof options === 'string') {
        const configFile = resolve(process.cwd(), options);
        //// eslint-disable-next-line import/no-dynamic-require
        options = require(configFile);
        // Tell eslint not to look for configuration files.
         
        options.useEslintrc = false;
    }
    const { include, exclude = /node_modules/, throwOnWarning = false, throwOnError = true, formatter = 'stylish', ...eslintOptions } = options;
    const eslintInstance = new ESLint({
      ...eslintOptions,
    });
    const filter = createFilter(include, exclude);
    return {
        name: 'eslint',
        async transform(_, id) {
            const file = normalizePath(id);
            if (!filter(id) || (await eslintInstance.isPathIgnored(file))) {
                return null;
            }
            const results = await eslintInstance.lintFiles(file);
            const [result] = results;
            if (eslintOptions.fix) {
                await ESLint.outputFixes(results);
            }
            if (result.warningCount === 0 && result.errorCount === 0) {
                return null;
            }
            const eslintFormatter = typeof formatter === 'string'
                ? await eslintInstance.loadFormatter(formatter)
                : { format: formatter };
            const output = await eslintFormatter.format(results);
            if (output) {
                 
                console.log(output);
            }
            const errorMessages = [];
            if (result.warningCount > 0 && throwOnWarning) {
                errorMessages.push(`${result.warningCount} warning${result.warningCount > 1 ? 's' : ''}`);
            }
            if (result.errorCount > 0 && throwOnError) {
                errorMessages.push(`${result.errorCount} error${result.errorCount > 1 ? 's' : ''}`);
            }
            if (errorMessages.length > 0) {
                throw new Error(`Found ${errorMessages.join(' and ')} in ${relative('.', result.filePath)}`);
            }
            return null;
        }
    };
}

export { eslint as default };