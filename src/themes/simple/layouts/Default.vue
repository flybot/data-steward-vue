<template>
    <Nav />

    <main class="container flex-shrink-0 mb-4">
        <router-view />
    </main>

    <Footer />
</template>

<script>
    import Nav from "../components/Nav.vue"
    import Footer from "../components/Footer.vue"

    export default {
        name: "DefaultLayout",
        components: {
            Nav, Footer,
        }
    };
</script>

<style>
    body {
        background-color: white;
    }
    main { 
        margin-top: 50px;
        min-height: 600px;
        }
</style>