const path = require('path');
const fs = require('fs');

function parseShaderCode(str) {

  return str.replaceAll('  ', '');
}

function main() {
  const filePath = (name) => path.join(__dirname, `${name}.js`);

  const jsonsInDir = fs
    .readdirSync(path.join(__dirname, '/json'))
    .filter((file) => path.extname(file) === '.json');

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join(__dirname, './json', file));
    const json = JSON.parse(fileData.toString());
    const name = file.replace('.json', '')

    const code = `
export const vertex${name} = \`${parseShaderCode(json.vertex)}\`

export const fragment${name} = \`${parseShaderCode(json.fragment)}\`

export const uniforms${name} = ${JSON.stringify(json.uniforms, null, 2)}
`;

    fs.writeFile(filePath(name), code, () => {
      console.info(`parsed ${file}`);
    });
  });
}

main();
