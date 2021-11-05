<template>
    <div>
        <input
            v-on:focus="$event.target.select()"
            ref="myinput"
            readonly
            hidden
            :value="'123'"/>
        <b-button variant="info"
                @click="copy"
        >
            Скопировать url
        </b-button>
    </div>

</template>

<script>
export default {
    name: "CopyUrl",
    methods: {
        copy() {
            let url = window.location.href
            console.log(url)
            const copyInput = document.createElement('input');
            copyInput.value = url;
            copyInput.setAttribute('readonly', '');
            document.body.appendChild(copyInput);
            copyInput.select();
            document.execCommand('copy');
            document.body.removeChild(copyInput);
        }
    }
}
</script>

<style scoped>

</style>