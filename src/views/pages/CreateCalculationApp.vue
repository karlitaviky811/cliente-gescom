<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import Breadcrumb from '@/components/BreadcrumbApp.vue'
import { DataTable } from 'simple-datatables';
import { useField } from 'vee-validate';
import * as yup from 'yup';
import DefaultCard from '@/components/DefaultCard.vue'
import { Form, Field, ErrorMessage } from 'vee-validate';
import MultiSelect from 'primevue/multiselect';
import DatePicker from 'primevue/datepicker';

const searchTable = ref('');
const breadcrumbOption = ref([
    {
        router: '/usuarios/',
        title: 'Listado de calculos',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Crear calculo',
        disabledOption: true
    },
]);



const schema: yup.Schema<any> = yup.object({
    name: yup.string().required('Nombre es requerido'),
    email: yup.string().required('Email es requerido').email('Email con formato inválido'),
    role: yup.string().required('Rol es requerido'),
    identification: yup.string().required('Cédula es requerido'),
    phone: yup.string().required('Teléfono es requerido').matches(/^[0-9-]{7,}$/, 'Formato es inválido'),
    password: yup.string().required('Password es requerido').min(8, 'Password debe tener al menos 8 caracteres'),
    address: yup.string().required('Nombre es requerido'),
    servicesProvider: yup.object().required('Los servicios son requeridos'),
    branches: yup.object().required('La sucursal es requerida'),
    paramscalculate: yup.object().required('Los parametros de calculo son obligatorios'),
    date: yup.date().required('Los parametros de calculo son obligatorios')
});

const typeU: any = ref([
    {
        id: 0,
        name: 'Técnico',
        title: 'TECNICO'
    },
])


const groupedCities = ref([
    {
        label: 'Ventas',
        code: 'VEN',
        items: [
            { label: 'Ventas', value: 'Ventas' },
            { label: 'Días laborados', value: 'Días laborados' },
            { label: 'Presupuestos', value: 'Presupuestos' },
            { label: 'Cumplimiento', value: 'Cumplimiento' },
            { label: 'Pool de Ventas', value: 'Pool de Ventas' },
        ]
    },
    {
        label: 'MCD',
        code: 'RA',
        items: [
            { label: 'MCD', value: 'MCD' },

        ]
    },

]);

const sucursales2 = ref([
    'Todas',
    'Sucursal Punto Fijo',
    'Agencia Valencia',
    'Sucursal Bello Monte',
    'Sucursal Boleita',
    'Sucursal Barquisimeto',
    'Sucursal Maracay',
    'Sucursal Carrizal',
    'Sucursal Lechería',
    'Sucursal Puerto Ordaz',
    'Agencia San Diego',
    'Agencia Centro Valencia',
    'Sucursal El Paraiso'
])

const sucursales = ref([
    {
        label: 'Sucursales',
        code: 'VEN',
        items: [
            { label: 'Sucursal Punto Fijo', value: 'Ventas' },
            { label: 'Agencia Valencia', value: 'Días laborados' },
            { label: 'Sucursal Bello Monte', value: 'Presupuestos' },
            { label: 'Sucursal Boleita', value: 'Cumplimiento' },
            { label: 'Sucursal Barquisimeto', value: 'Pool de Ventas' },
            { label: 'Sucursal Maracay', value: 'Cumplimiento' },
            { label: 'Sucursal Carrizal', value: 'Pool de Ventas' },
            { label: 'Sucursal Lechería', value: 'Pool de Ventas' },
            { label: 'Sucursal Puerto Ordaz', value: 'Cumplimiento' },
            { label: 'Agencia San Diego', value: 'Pool de Ventas' },
            { label: 'Agencia Centro Valencia', value: 'Pool de Ventas' },
            { label: 'Sucursal El Paraiso', value: 'Cumplimiento' },
        ]

    },
]);
let { value: name } = reactive(useField<any>('name'));;
let { value: email } = reactive(useField<any>('email'));;
let { value: phone } = reactive(useField<any>('phone'));;
let { value: password } = reactive(useField<any>('password'));
let { value: address } = reactive(useField<any>('address'))
let { value: role } = reactive(useField<any>('role'))
let { value: identification } = reactive(useField<any>('identification'))
let { value: servicesProvider } = reactive(useField<any>('servicesProvider'))

let { value: paramscalculate } = reactive(useField<any>('paramscalculate'))
let { value: branches } = reactive(useField<any>('branches'))

let { value: date } = reactive(useField<any>('date'))
const cargos = ref([{
    id: 0,
    name: 'Asesor'
},
{
    id: 1,
    name: 'Especialista'
}, {
    id: 2,
    name: 'Gerente de Ventas'
}, {
    id: 3,
    name: 'Activador Comercial'
}, {
    id: 4,
    name: 'Gerente Region'
},
{
    id: 5,
    name: 'Gerente Nacional Ventas'
},
{
    id: 6,
    name: 'Gerente Tiendas'
},
{
    id: 7,
    name: 'Instructor Shake'
}

])

const origins = ref([
    'Ventas',
    'Dias laborados',
    'Presupuestos',
    'Cumplimiento',
    'Pool de Ventas',
    'MCD'
])

const metas = ref([
    ''
])

const configurations = ref([{
    label: 'Operaciones',
    code: 'VEN',
    items: [
        { label: 'Suma asesor', value: 'suma' },
        { label: 'Promedio de ventas', value: '0.8' },
        { label: 'Monto', value: '' },
    ]
},
])

onMounted(() => {
    initFlowbite();

    const tableElement = searchTable.value;
    if (tableElement) {
        new DataTable(tableElement, {
            searchable: true,
            sortable: true,
            labels: {
                placeholder: "Buscar...",
                noRows: "No se encontraron resultados",
                info: "Mostrando {start} a {end} de {rows} resultados",
                noResults: "No se encontraron resultados"
            }
        });
    }
})


async function submit(values: any) {
    console.log('submit formbg', values)

    let data: any = {
        "User_name": values.name,
        "Name_user_comercial": values.nameComercial,
        "Services": "['Reparaciión de aire acondicionado', 'Instalacion de topes cocinas' , 'Reparación de hornos']",
        "Email": values.email,
        "Password": values.password,
        "ID_rol": values.role,
        "Phone": values.phone,
        "Address": values.address,
        "Tickets": "[]",
        "Identification_Comercial": values.identification
    }

    console.log('user', data)
    const baseUrl = `${import.meta.env.VITE_API_URL}/`;
    await fetch(`${baseUrl}api/technician/createTechnician`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {

        response.json().then((data) => {
            console.log('response', data)


        });
    })
}

</script>

<template>
    <Breadcrumb :data="breadcrumbOption" />
    <h3 class="text-3xl font-bold mt-5 dark:text-white mb-12">Crear nuevo Cálculo</h3>

    <DefaultCard cardTitle="Datos Generales">
        <div class="flex flex-col items-center justify-center p-4">
            <!-- Author: FormBold Team -->
            <div class="w-full bg-white">

                <Form @submit="submit" :validation-schema="schema" class="flex flex-col w-full">
                    <div class="grid md:grid-cols-3 md:gap-6">
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                                Nombre <span>*</span>
                            </label>
                            <Field name="name" v-model="name" placeholder="Ingrese nombre del usuario"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="name" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Cargo <span>*</span>
                            </label>
                            <Field name="role" as="select" v-model="role" placeholder="Seleccione el tipo de servicio"
                                class="w-full rounded-lg border-[1px]  border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                <option v-for="rol in cargos" :key="rol.name" :value="rol.name" class="w-full">
                                    {{ rol.name }}
                                </option>
                            </Field>
                            <ErrorMessage name="role" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Mes <span>*</span>
                            </label>
                            <Field name="date" v-slot="{ field }">
                                <DatePicker v-model="date" v-bind="field" view="month" dateFormat="mm/yy" class="w-full" />
                            </Field>
                            <ErrorMessage name="role" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Fuentes de Datos <span>*</span>
                            </label>
                            <Field name="servicesProvider" v-slot="{ field }">
                                <MultiSelect v-model="servicesProvider" v-bind="field" :options="groupedCities"
                                    optionLabel="label" filter optionGroupLabel="label" optionGroupChildren="items"
                                    display="chip" placeholder="Seleccionar servicios" class="w-full md:w-80">
                                    <template #optiongroup="slotProps">
                                        <div class="flex items-center">
                                            <img :alt="slotProps.option.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.option.label }}</div>
                                        </div>
                                    </template>
                                </MultiSelect>
                                <ErrorMessage name="servicesProvider" class="text-[#c82a08] text-sm" />
                            </Field>
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Sucursales <span>*</span>
                            </label>
                            <Field name="branches" v-slot="{ field }">
                                <MultiSelect v-model="branches" v-bind="field" :options="sucursales" optionLabel="label"
                                    filter optionGroupLabel="label" optionGroupChildren="items" display="chip"
                                    placeholder="Seleccionar servicios" class="w-full md:w-80">
                                    <template #optiongroup="slotProps">
                                        <div class="flex items-center">
                                            <img :alt="slotProps.option.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.option.label }}</div>
                                        </div>
                                    </template>
                                </MultiSelect>
                                <ErrorMessage name="servicesProvider" class="text-[#c82a08] text-sm" />
                            </Field>
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Parámetros de cálculo <span>*</span>
                            </label>
                            <Field name="paramscalculate" v-slot="{ field }">
                                <MultiSelect v-model="paramscalculate" v-bind="field" :options="configurations"
                                    optionLabel="label" filter optionGroupLabel="label" optionGroupChildren="items"
                                    display="chip" placeholder="Seleccionar servicios" class="w-full md:w-80">
                                    <template #optiongroup="slotProps">
                                        <div class="flex items-center">
                                            <img :alt="slotProps.option.label"
                                                src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                                :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`"
                                                style="width: 18px" />
                                            <div>{{ slotProps.option.label }}</div>
                                        </div>
                                    </template>
                                </MultiSelect>
                                <ErrorMessage name="servicesProvider" class="text-[#c82a08] text-sm" />
                            </Field>
                        </div>





                    </div>
                    <div>
                        <button
                            class="text-white w-1/5 p-2 m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Crear
                        </button>
                    </div>
                </Form>
            </div>
        </div>

    </DefaultCard>
</template>
<style></style>