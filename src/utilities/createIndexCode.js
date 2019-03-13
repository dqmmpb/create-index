import _ from 'lodash';

const safeVariableName = (fileName) => {
  const indexOfDot = fileName.indexOf('.');

  if (indexOfDot === -1) {
    return fileName;
  } else {
    return fileName.slice(0, indexOfDot);
  }
};

const buildExportBlock = (files) => {
  const dirImports = [];
  const dirExports = [];
  const fileExports = [];

  const lineEnding = '';

  files.forEach((fileName) => {
    const safeName = safeVariableName(fileName);
    if (safeName === fileName) {
      dirImports.push(`import * as ${safeName} from './${safeName}'${lineEnding}`);
      dirExports.push(`export { ${safeName} }${lineEnding}`);
    } else {
      fileExports.push(`export { default as ${safeName} } from './${safeName}'${lineEnding}`);
    }
  });

  if (dirImports.length > 0) {
    dirImports.push('');
  }
  const block = dirImports.concat(dirExports).concat(fileExports).join('\n');

  return block;
};

export default (filePaths, options = {}) => {
  let code;
  let configCode;

  code = '';
  configCode = '';

  if (options.banner) {
    const banners = _.isArray(options.banner) ? options.banner : [options.banner];

    banners.forEach((banner) => {
      code += banner + '\n';
    });

    code += '\n';
  }

  if (options.config && _.size(options.config) > 0) {
    configCode += ' ' + JSON.stringify(options.config);
  }

  code += '// @create-index' + configCode + '\n\n';

  if (filePaths.length) {
    const sortedFilePaths = filePaths.sort();

    code += buildExportBlock(sortedFilePaths) + '\n\n';
  }

  return code;
};
