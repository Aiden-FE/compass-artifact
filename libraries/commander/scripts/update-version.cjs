const fs = require('node:fs');
const path = require('node:path');

const pkgPath = path.resolve(__dirname, '../package.json');

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(pkgPath);

const args = process.argv;

const index = args.indexOf('-v');

if (index === -1) {
  throw new Error('未指定版本参数');
}

const version = args[index + 1];

if (!version) {
  throw new Error('未指定版本值');
}

pkg.version = version.replace(/(^v)/, '');

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
