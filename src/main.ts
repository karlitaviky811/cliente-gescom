

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'
import 'flowbite/dist/flowbite.css'
//import '@bhplugin/vue3-datatable/dist/style.css'

import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';

import DialogService from 'primevue/dialogservice'
const app = createApp(App)
import 'primeicons/primeicons.css'
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Toolbar from 'primevue/toolbar';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import IconField from 'primevue/iconfield';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import Column from 'primevue/column';
import StyleClass from 'primevue/styleclass';
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';


app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
});
app.component('Dialog', Dialog);
app.component('InputNumber', InputNumber);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Toolbar', Toolbar)

app.component('FileUpload', FileUpload)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('RadioButton', RadioButton)
app.component('Dropdown', Dropdown)
app.component('Textarea', Textarea)
app.component('IconField', IconField)
app.component('Rating', Rating)
app.component('Tag', Tag)
app.component('Column', Column)
app.component('Breadcrumb', Breadcrumb)
app.component('Row', Row)
app.component('ColumnGroup', ColumnGroup)
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.mount('#app')
