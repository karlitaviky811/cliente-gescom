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
const searchTable = ref('');
const breadcrumbOption = ref([
    {
        router: '/usuarios/',
        title: 'Listado de técnicos',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Crear técnico',
        disabledOption: true
    },
]);



const schema: yup.Schema<any> = yup.object({
    name: yup.string().required('Nombre es requerido'),
    nameComercial: yup.string().required('Nombre comercial es requerido'),
    email: yup.string().required('Email es requerido').email('Email con formato inválido'),
    role: yup.string().required('Rol es requerido'),
    identification: yup.string().required('Cédula es requerido'),
    phone: yup.string().required('Teléfono es requerido').matches(/^[0-9-]{7,}$/, 'Formato es inválido'),
    password: yup.string().required('Password es requerido').min(8, 'Password debe tener al menos 8 caracteres'),
    address: yup.string().required('Nombre es requerido'),
    servicesProvider: yup.object().required('Los servicios son requeridos'),
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
        label: 'Aires - Instalación',
        code: 'RA',
        items: [
            { label: 'Aires de Ventana', value: 'Berlin' },
            { label: 'Split', value: 'Split' },
            { label: 'Centrales', value: 'Centrales' },
        ]
    },
    {
        label: 'Aires - Reparación',
        code: 'RA',
        items: [
            { label: 'Aires de Ventana', value: 'Berlin' },
            { label: 'Split', value: 'Split' },
            { label: 'Centrales', value: 'Centrales' },
        ]
    },
    {
        label: 'Refrigeración - Neveras',
        code: 'RN',
        items: [
            { label: 'Nevera dos puertas', value: 'Chicago' },
            { label: 'Nevera pequeña', value: 'Nevera pequeña' },
            { label: 'Filtros', value: 'Filtros' },

        ]
    },
    {
        label: 'Cocinas',
        code: 'C',
        items: [
            { label: 'Eletrica', value: 'Eletrica' },
            { label: 'Topes', value: 'Topes' },
        ]
    },
    {
        label: 'Hornos',
        code: 'H',
        items: [
            { label: 'Horno Empotrado', value: 'Kyoto' },
            { label: 'Microondas', value: 'Microondas' },
            { label: 'HairFriyer', value: 'HairFriyer' },

        ]
    }
]);
let { value: name } = reactive(useField<any>('name'));;
let { value: nameComercial } = reactive(useField<any>('nameComercial'));;
let { value: email } = reactive(useField<any>('email'));;
let { value: phone } = reactive(useField<any>('phone'));;
let { value: password } = reactive(useField<any>('password'));
let { value: address } = reactive(useField<any>('address'))
let { value: role } = reactive(useField<any>('role'))
let { value: identification } = reactive(useField<any>('identification'))
let { value: servicesProvider } = reactive(useField<any>('servicesProvider'))


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
    <h3 class="text-3xl font-bold mt-5 dark:text-white mb-12">Crear nuevo Tecnico</h3>

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
                                Nombre Comercial <span>*</span>
                            </label>
                            <Field name="nameComercial" v-model="nameComercial" placeholder="Ingrese nombre comercial"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="nameComercial" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Cédula / RIF <span>*</span>
                            </label>
                            <Field name="identification" v-model="identification"
                                placeholder="Ingrese documento de identidad"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="identification" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Teléfono <span>*</span>
                            </label>
                            <Field name="phone" v-model="phone" placeholder="Ingrese número de teléfono"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="phone" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Email <span>*</span>
                            </label>
                            <Field name="email" v-model="email" placeholder="Ingrese e-mail"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="email" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Servicios <span>*</span>
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
                                Password <span>*</span>
                            </label>
                            <Field name="password" v-model="password" placeholder="Ingrese password"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="password" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Rol <span>*</span>
                            </label>

                            <Field name="role" as="select" v-model="role" placeholder="Seleccione el tipo de servicio"
                                class="w-full rounded-lg border-[1px]  border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                <option v-for="rol in typeU" :key="rol.title" :value="rol.title" class="w-full">
                                    {{ rol.name }}
                                </option>
                            </Field>
                            <ErrorMessage name="role" class="text-[#c82a08] text-sm" />
                        </div>

                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Dirección <span>*</span>
                            </label>
                            <Field name="address" v-model="address" placeholder="Ingrese password"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="address" class="text-[#c82a08] text-sm" />
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