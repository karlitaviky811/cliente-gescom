<template>
    <Breadcrumb :data="breadcrumbOption" />
    <h3 class="text-3xl font-bold mt-5 dark:text-white">Comisiones </h3>
    <div class="flex justify-end m-2">
        <Button label="Nuevo ticket" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
    </div>
   
    
    <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true" :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
        <template #header>
            <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 class="m-0"></h4>
                <IconField iconPosition="left">
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </IconField>

            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="Request_numberId" header="Code" sortable style="min-width:12rem"></Column>
        <Column field="Request_name" header="Name" sortable style="min-width:16rem"></Column>
        <Column field="Request_status" header="Status" sortable style="min-width:12rem">
            <template #body="slotProps">
                <Tag :value="slotProps.data.Request_status" :severity="getStatusLabel(slotProps.data.Request_status)" />
            </template>
        </Column>
        <Column field="Type_service" header="Servicio" sortable style="min-width:10rem"></Column>
        <!--Column field="rating" header="Reviews" sortable style="min-width:12rem">
            <template #body="slotProps">
                <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
        </Column>
        <Column header="Image">
            <template #body="slotProps">
                <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                    :alt="slotProps.data.image" class="border-round" style="width: 64px" />
            </template>
        </Column>
       
        <Column field="category" header="Category" sortable style="min-width:10rem"></Column-->

        <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-eye" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-pencil" outlined rounded severity="primary" class="mr-2" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-trash" outlined rounded severity="danger"
                    @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
        class="p-fluid flex flex-row">
        <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
            :alt="product.image" class="block m-auto pb-3" />
        <div class="flex flex-col m-2">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="product.name" required="true" autofocus
                :invalid="submitted && !product.name" />
            <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
        </div>
        <div class="flex flex-col">
            <label for="description">Description</label>
            <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
        </div>

        <div class="flex flex-col">
            <label for="inventoryStatus" class="mb-3">Inventory Status</label>
            <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label"
                placeholder="Select a Status">
                <template #value="slotProps">
                    <div v-if="slotProps.value && slotProps.value.value">
                        <Tag :value="slotProps.value.value" :severity="getStatusLabel(slotProps.value.label)" />
                    </div>
                    <div v-else-if="slotProps.value && !slotProps.value.value">
                        <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
                    </div>
                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>
                </template>
            </Dropdown>
        </div>

        <div class="flex flex-col">
            <label class="mb-3">Category</label>
            <div class="formgrid grid">
                <div class="field-radiobutton col-6">
                    <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                    <label for="category1">Accessories</label>
                </div>
                <div class="field-radiobutton col-6">
                    <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                    <label for="category2">Clothing</label>
                </div>
                <div class="field-radiobutton col-6">
                    <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                    <label for="category3">Electronics</label>
                </div>
                <div class="field-radiobutton col-6">
                    <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                    <label for="category4">Fitness</label>
                </div>
            </div>
        </div>

        <div class="formgrid grid">
            <div class="flex flex-col">
                <label for="price">Price</label>
                <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
            </div>
            <div class="flex flex-col">
                <label for="quantity">Quantity</label>
                <InputNumber id="quantity" v-model="product.quantity" integeronly />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
        </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="product">Are you sure you want to delete the selected products?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/services/ProductService';
import Breadcrumb from '@/components/BreadcrumbApp.vue'

import router from '@/router';

const breadcrumbOption = ref([
    {
        router: '/reports',
        title: 'Listado de comisiones',
        disabledOption: false
    },
]);
onMounted(async () => {
    ProductService.getProducts().then((data) => (products.value = data));
    const baseUrl = `${import.meta.env.VITE_API_URL}/`;
    await fetch(`${baseUrl}api/tickets/allRequest`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then((response) => {

        response.json().then((data) => {
            console.log('response', data.tikets)

            //dataUsers.value = data.tikets
            products.value = data.tikets
            console.log('dataUsers', dataUsers.value.length)
        });
    })
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

const formatCurrency = (value) => {
    if (value)
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
};
const openNew = () => {
    //product.value = {};
    //submitted.value = false;
    //productDialog.value = true;
    console.log('navigateTo')
    router.push('/tickets/create')
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const saveProduct = () => {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
};
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};

</script>
<style>
.field {
    display: flex;
    flex-direction: row
}
</style>