import path from 'path';
import { ESLint } from 'eslint';
import { createFilter } from '@rollup/pluginutils';

function normalizePath(id) {
    return path.relative(process.cwd(), id).split(path.sep).join('/');
}
function eslintPlugin(options = {}) {
    const defaultOptions = {
        cache: false,
        fix: false,
        throwOnWarning: true,
        throwOnError: true,
    };
    const opts = { ...defaultOptions, ...options };
    const eslint = new ESLint({
        cache: opts.cache,
        fix: opts.fix,
    });
    const filter = createFilter(opts.include, opts.exclude || /node_modules/);
    let formatter;
    return {
        name: 'custom-rollup-eslint-plugin',
        async transform(_, id) {
            const file = normalizePath(id);
            if (!filter(id) || (await eslint.isPathIgnored(file))) {
                return null;
            }
            switch (typeof opts.formatter) {
                case 'string':
                    formatter = await eslint.loadFormatter(opts.formatter);
                    break;
                case 'function':
                    formatter = opts.formatter;
                    break;
                default:
                    formatter = await eslint.loadFormatter('stylish');
            }
            const report = await eslint.lintFiles(file);
            const hasWarnings = opts.throwOnWarning && report.some((item) => item.warningCount !== 0);
            const hasErrors = opts.throwOnError && report.some((item) => item.errorCount !== 0);
            const result = formatter.format(report);
            if (opts.fix && report) {
                void ESLint.outputFixes(report);
            }
            if (hasWarnings) {
                this.warn(result);
            }
            if (hasErrors) {
                this.error(result);
            }
            return null;
        },
    };
}

export { eslintPlugin as default };