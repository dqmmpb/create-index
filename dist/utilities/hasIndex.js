"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = directoryPath => {
  const indexPath = _path.default.resolve(directoryPath, 'index.js');

  try {
    _fs.default.statSync(indexPath);

    return true;
  } catch (error) {
    return false;
  }
};

exports.default = _default;
//# sourceMappingURL=hasIndex.js.map