<script>
    import "bootstrap";
    import { defineAsyncComponent } from 'vue';

    export default {
        components: {
            DefaultLayout:  defineAsyncComponent(() => import("./themes/" + import.meta.env.VITE_THEME + "/layouts/Default.vue") ),
            AdminLayout: defineAsyncComponent(() => import("./themes/" + import.meta.env.VITE_THEME + "/layouts/Admin.vue") )
        },
        data() {
            //this.$router.go(); refresh page to apply languages list
            return {
                layout: null,
            };
        },
        watch: {
            $route(to) {
                this.layout = to.meta.layout !== undefined ? to.meta.layout : "DefaultLayout";
            }
        }
    };
</script>

<template>
    <component :is="layout" />
</template>

<style>
.error-feedback {
	color: red;
	font-style: italic;
	font-size: small;
}
</style>