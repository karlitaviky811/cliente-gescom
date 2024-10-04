<script setup lang="ts">
import DefaultCard from '@/components/DefaultCard.vue'

import { ref, onMounted, watch } from 'vue';
import { useForm } from 'vee-validate'
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useField } from 'vee-validate';
import { reactive } from 'vue';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import Breadcrumb from '@/components/BreadcrumbApp.vue'
const breadcrumbOption = ref([
    {
        router: '/usuarios/',
        title: 'Listado de tickets',
        disabledOption: false
    },
    {
        router: '/#',
        title: 'Crear ticket',
        disabledOption: true
    },
]);

let calendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
        { title: 'Meeting', start: new Date() }
    ]
}
const schema: yup.Schema<any> = yup.object({
    email: yup.string().required('Email es requerido'),
    nameTicket: yup.string().required('Nombre es requerido'),
    typeService: yup.string().required('Seleccione tipo de servicio'),
    descriptionTicket: yup.string().required('Descripción es requerido'),
    client: yup.string().required(),
    identification: yup.string().required(),
    addressclient: yup.string().required(),
    bill: yup.string().required('Número de factura requerido'),
    product: yup.string().required(),
    dateBill: yup.string().required(),
    namecontact: yup.string().required(),
    phonecontact: yup.string().required().matches(/^[0-9-]{7,}$/),
});
const form = ref(null)


let { value: email } = useField<any>('email');
let { value: nameTicket } = useField<any>('nameTicket');
let { value: typeService } = useField<any>('typeService');
let { value: descriptionTicket } = reactive(useField<any>('descriptionTicket'));
let { value: client } = useField<string>('client');
let { value: identification } = useField<any>('identification');
let { value: addressclient } = useField<string>('addressclient');
let { value: bill } = useField<any>('bill');
let { value: product } = useField<any>('product')
let { value: dateBill } = useField('dateBill')
let { value: namecontact } = useField('namecontact')
let { value: phonecontact } = useField('phonecontact')

const typeServiceSelected = ref('')
let validUserTicket: any = ref(false)
const typeS: any = ref([
    {
        id: 0,
        name: 'Seleccionar servicio'
    },
    {
        id: 1,
        name: 'Instalación'
    }, {
        id: 2,
        name: 'Garantía'
    }
])
let productsList: any = ref([])
async function submit(values: any) {

    let ticket = {
        "Request_name": values.nameTicket,
        "Request_status": "Creada",
        "Product_detail": values.product,
        "Request_status_description": "En espera de asignación",
        "Request_description": values.descriptionTicket,
        "Type_service": values.typeService,
        "Email": values.email,
        "Phone_number": values.phonecontact,
        "Bill_client": values.bill,
        "Address_PersonContact": values.addressclient,
        "Phone_PersonContact": values.phonecontact,
        "Necessary_skills": ""
    }
    console.log('submit formbg', values, ticket)

    console.log('user', ticket)
    const baseUrl = `${import.meta.env.VITE_API_URL}/`;
    await fetch(`${baseUrl}api/tickets/createRequest`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    }).then(response => {

        response.json().then((data) => {
            console.log('response', data)


        });
    })
}


watch(bill, async (newBill, oldbill) => {

    if (newBill.length == 7) {
        const baseUrl = `${import.meta.env.VITE_API_URL}/`;
        console.log('baseUrl', baseUrl)
        validUserTicket.value = false
        try {
            const res: any = await fetch(`${baseUrl}api/tickets/facturaCliente/${newBill}`).then(response => {

                response.json().then((data) => {
                    console.log('response', data)
                    if (data.billingUser[0].length) {
                        validUserTicket.value = true
                        productsList.value.push({
                            id: 0,
                            name: data.billingUser[0][0].Producto
                        })
                        identification.value = data.billingUser[0][0].CodCliente
                        client.value = data.billingUser[0][0].Cliente
                        dateBill.value = data.billingUser[0][0].Fecha.split('T')[0]
                    }

                });
            })



        } catch (error) {
            console.log('error', error)
        } finally {
            console.log('finally')
        }
    }
})

const pageTitle = ref('Crear Ticket')
</script>

<template>
    <Breadcrumb :data="breadcrumbOption" />
    <h3 class="text-3xl font-bold mt-5 dark:text-white mb-4">Crear nuevo Ticket</h3>



    <div class="flex flex-col items-center justify-center py-4">
        <!-- Author: FormBold Team -->
        <div class="w-full bg-white">

            <Form @submit="submit" :validation-schema="schema" class="flex flex-col w-full">
                <DefaultCard cardTitle="Datos Generales">
                    <div class="grid md:grid-cols-3 md:gap-6 p-2">
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Nombre <span>*</span>
                            </label>
                            <Field name="nameTicket" as="input" v-model="nameTicket"
                                class="w-full rounded-lg border-[1px] border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="nameTicket" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Tipo de Servicio
                            </label>
                            <Field name="typeService" as="select" v-model="typeService"
                                placeholder="Seleccione el tipo de servicio"
                                class="w-full rounded-lg border-[1px] border-[#dee2e6] border-stroke text-black bg-transparent py-3 px-5 font-normal outline-none transition">
                                <option v-for="category in typeS" :key="category.name" :value="category.name"
                                    class="w-full">
                                    {{ category.name }}
                                </option>
                            </Field>
                            <ErrorMessage name="typeService" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Factura
                            </label>
                            <Field name="bill" v-model="bill"
                                class="w-full rounded-lg border-[1px] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="bill" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Fecha factura
                            </label>

                            <div class="relative max-w-sm">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <Field name="dateBill" v-slot="{ field }" v-model="dateBill">
                                    <input datepicker v-bind="field" type="date"
                                        class="w-full min-w-[223px] rounded-lg border-[1px] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="Select date">
                                </Field>
                            </div>

                            <ErrorMessage name="dateBill" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Nombre del cliente <span>*</span>
                            </label>
                            <Field name="client" v-model="client" placeholder="Ingrese e-mail"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="client" class="text-[#c82a08] text-sm" />
                        </div>

                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Documento <span>*</span>
                            </label>
                            <Field name="identification" v-model="identification" placeholder="Ingrese password"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="identification" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Producto <span>*</span>
                            </label>
                            <Field name="product" as="select" v-model="product"
                                placeholder="Seleccione el tipo de servicio"
                                class="w-full rounded-lg border-[1px]  border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                <option v-for="category in productsList" :key="category.name" :value="category.name"
                                    class="w-full">
                                    {{ category.name }}
                                </option>
                            </Field>
                            <ErrorMessage name="product" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group col-span-2">
                            <div class="flex flex-col">
                                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Descripción <span>*</span>
                                </label>
                                <Field as="textarea" name="descriptionTicket" v-model="descriptionTicket"
                                    id="description" cols="30" rows="2"
                                    class="w-full rounded-lg border-[1px] border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                <ErrorMessage name="descriptionTicket" class="text-[#c82a08] text-sm" />
                            </div>
                        </div>
                    </div>
                </DefaultCard>
                <DefaultCard cardTitle="Datos del cliente a prestar servicios" class="my-4">
                    <div class="grid md:grid-cols-3 md:gap-6 p-2">
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Nombre Contacto<span>*</span>
                            </label>
                            <Field name="namecontact" as="input" v-model="namecontact"
                                class="w-full rounded-lg border-[1px] border-[#dee2e6] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="namecontact" class="text-[#c82a08] text-sm" />
                        </div>

                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                                Telefono de contacto <span> *</span>
                            </label>
                            <Field name="phonecontact" v-model="phonecontact"
                                class="w-full rounded-lg border-[1px] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="phonecontact" class="text-[#c82a08] text-sm" />
                        </div>

                        
                        <div class="relative z-0 w-full mb-2 group">
                            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Email <span> *</span>
                            </label>
                            <Field name="email" v-model="email"
                                class="w-full rounded-lg border-[1px] border-stroke text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="email" class="text-[#c82a08] text-sm" />
                        </div>
                        <div class="relative z-0 w-full mb-2 group">
                            <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                                Dirección <span>*</span>
                            </label>
                            <Field name="addressclient" v-model="addressclient" placeholder="Ingrese password"
                                class="w-full rounded-lg border-[1px] text-black border-stroke  border-[#e0e0e0] bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                            <ErrorMessage name="addressclient" class="text-[#c82a08] text-sm" />
                        </div>
                    </div>
                </DefaultCard>
                <div>
                    <button
                        class="text-white w-1/5 p-2 m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Crear
                    </button>
                </div>
            </Form>
        </div>
    </div>


</template>
