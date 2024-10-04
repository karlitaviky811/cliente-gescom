<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    // type inference enabled
    props: {
        name: String,
        msg: { type: String, required: true }
    },
    mounted() {
        this.getUsers()
    },
    data() {
        return {
            count: 1,
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    title: '#',
                    align: 'start',
                    sortable: false,
                    key: 'id',
                },
                {
                    title: 'Mes',
                    align: 'start',
                    sortable: false,
                    key: 'month',
                },
                {
                    title: 'Rol',
                    align: 'start',
                    sortable: false,
                    key: 'role',
                },
                {
                    title: 'Permisos',
                    align: 'start',
                    sortable: false,
                    key: 'role',
                },
                { title: 'Nombre', key: 'name' },
                { title: 'Creado', key: 'createdBy' },
                { title: 'Fecha', key: 'date' },
                { title: '', key: 'actions', sortable: false },
            ],
            desserts: [{
                id: '1',
                month: 'Agosto',
                name: 'CATEGORIA I - ASESOR',
                calories: 159,
                createdBy: 'Juan Manuel',
                date: new Date().toDateString(),
                protein: 4.0,
            },
            {
                id: '2',
                month: 'Agosto',
                name: 'CATEGORIA I - ASESOR',
                calories: 159,
                createdBy: 'Juan Manuel',
                date: new Date().toDateString(),
                protein: 4.0,
            },
            {
                id: '3',
                month: 'Agosto',
                name: 'CATEGORIA I - ASESOR',
                calories: 159,
                createdBy: 'Juanita Lopez',
                date: new Date().toDateString(),
                protein: 4.0,
            }


            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    methods: {
        initialize() {

        },

        editItem(item: any) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item: any) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        getUsers() {
            const baseUrl = `${import.meta.env.VITE_API_URL}/`;
            fetch(`${baseUrl}user/users`).then((res) => {
                console.log('res', res)
                res.json().then((data) => {
                    console.log('data---', data)
                    this.desserts = data.users
                });
            })
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                //this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
})
</script>
<template>
  <router-view />
</template>
