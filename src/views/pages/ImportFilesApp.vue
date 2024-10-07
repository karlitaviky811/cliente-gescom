<template>
    <ThemeSwitcher />
    <div class="card">
        <Toast />
        <FileUpload name="demo[]" @select="onChange"    chooseIcon="pi pi-upload" :multiple="true" accept=".csv,.xml,.tsv,.xlsx" id="archivoExcel"
            :maxFileSize="1000000" ref="archivoExcel" choose-icon="fa flag">
            <template #empty>
                <span>Drag and drop files to here to upload.</span>
            </template>
        </FileUpload>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useToast } from "primevue/usetoast";
import readXlsxFile from 'read-excel-file'
const $primevue = usePrimeVue();
const toast = useToast();
const baseUrl2 = `${import.meta.env.VITE_API_URL}/api/metaCategoria2/createMetaCategoria`;
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);
const archivoExcel = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;

    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};
const onAdvancedUpload = () => {
    console.log('event', event)
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

function onChange(event) {

    console.log('event', event)
    const input = document.getElementById('archivoExcel');
    var json = document.getElementById("json_data")
    console.log('event', archivoExcel._value.files[0], files.value, event.files)
    readXlsxFile(archivoExcel._value.files[0]).then(async function (data) {
        var headers = data[1];
        const jsonData = [];
        var headersExcel = []
        data.map((row, index) => {
            const isStringsArray = row.every((i) => {
                return typeof i === "string";
            });

            if (isStringsArray) {
                let values = [];
                let dataNoEmpty = false;
                let indexValues = index;
                while (!dataNoEmpty) {
                    indexValues++;
                    if (data[indexValues][0] !== null) {
                        values.push(data[indexValues]);
                    } else {
                        dataNoEmpty = true;
                    }

                }
                headersExcel.push({
                    title: data[index - 1][0],
                    row: index,
                    values: values,
                    keys: data[index]
                });
                /*json.value = JSON.stringify(
                    jsonData,
                    null,
                    2
                );*/
                console.log('donde estan los subs', headersExcel);

            }

        })

        console.log('event',headersExcel)
        const baseUrl = `${import.meta.env.VITE_API_URL}`;
        fetch(`${baseUrl}/api/metaCategoria2/createMetaCategoria`, {
            method: "POST",
            body: JSON.stringify({
                "data": headersExcel
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {

                response.json().then(async (data) => {
                    
                        console.log('data', data)
                        toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
                

                })



            })
            .catch((err) => {
                console.error(err.message);
            });

    });
}

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>
