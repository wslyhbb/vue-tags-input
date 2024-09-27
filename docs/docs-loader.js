const path = require('path');

module.exports = async function() {
  const callback = this.async();
  const filepath = path.relative(process.cwd(), this.resourcePath);

  import('documentation').then((documentation) => {
    documentation.build(['./' + filepath], {
      extension: ['.js', '.vue'],
    }).then(documentation.formats.json)
      .then(res => callback(null, 'module.exports = ' + res + ';'));
  });
};
