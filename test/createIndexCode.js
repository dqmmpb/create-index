/* eslint-disable no-restricted-syntax */

import {expect} from 'chai';
import createIndexCode from '../src/utilities/createIndexCode';
import codeExample from './codeExample';

describe('createIndexCode()', () => {
  it('describes no children', () => {
    const indexCode = createIndexCode([]);

    expect(indexCode).to.equal(codeExample(`
// @create-index
    `));
  });
  it('describes a single child', () => {
    const indexCode = createIndexCode(['foo.js']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as foo } from './foo';
    `));
  });
  it('describes multiple children', () => {
    const indexCode = createIndexCode(['bar.js', 'foo.js']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as bar } from './bar';
export { default as foo } from './foo';
    `));
  });
  it('describes a directory import', () => {
    const indexCode = createIndexCode(['foo']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

import * as foo from './foo';

export { foo };
    `));
  });
  it('describes a directory and file import', () => {
    const indexCode = createIndexCode(['foo', 'bar.js']);

    expect(indexCode).to.equal(codeExample(`
// @create-index

import * as foo from './foo';

export { foo };
export { default as bar } from './bar';
    `));
  });
  context('file with extension', () => {
    it('removes the extension from the export statement', () => {
      const indexCode = createIndexCode(['foo.js']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as foo } from './foo';
      `));
    });
  });
  context('multiple files, unsorted', () => {
    it('sorts the files', () => {
      const indexCode = createIndexCode(['foo.js', 'bar.js']);

      expect(indexCode).to.equal(codeExample(`
// @create-index

export { default as bar } from './bar';
export { default as foo } from './foo';
      `));
    });
  });

  context('with config', () => {
    it('should append config', () => {
      const config = {
        ignore: ['/^zoo/']
      };
      const indexCode = createIndexCode(['foo.js', 'bar.js'], {config});

      expect(indexCode).to.equal(codeExample(`
// @create-index {"ignore":["/^zoo/"]}

export { default as bar } from './bar';
export { default as foo } from './foo';
      `));
    });
  });
});
