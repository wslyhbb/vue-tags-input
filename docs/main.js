import 'normalize-css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { format, mergeDocs } from './docs-formatter';
import docsData from './docs-data.json';

// Load pre-generated documentation
const merged = mergeDocs(docsData.props, docsData.docs);
window.docs = format(merged);

const app = createApp(App);

app.use(router);
app.mount('#app-container');
