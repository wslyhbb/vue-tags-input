import path from 'path';
import { fileURLToPath } from 'url';
import * as documentation from 'documentation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateDocs() {
  try {
    console.log('Generating documentation...');
    
    // Build docs for the main component
    const docsOutput = await documentation
      .build([path.resolve(__dirname, '../vue-tags-input/vue-tags-input.js')], {
        extension: ['.js', '.vue'],
      });
    
    const docs = await documentation.formats.json(docsOutput);
    
    // Build docs for props
    const propsOutput = await documentation
      .build([path.resolve(__dirname, '../vue-tags-input/vue-tags-input.props.js')], {
        extension: ['.js', '.vue'],
      });
    
    const props = await documentation.formats.json(propsOutput);
    
    // Write to a JSON file that can be imported
    const fs = await import('fs');
    const outputPath = path.resolve(__dirname, './docs-data.json');
    
    fs.writeFileSync(outputPath, JSON.stringify({ docs: JSON.parse(docs), props: JSON.parse(props) }, null, 2));
    console.log('✓ Documentation generated successfully at', outputPath);
  } catch (error) {
    console.error('Error generating documentation:', error);
    process.exit(1);
  }
}

generateDocs();
