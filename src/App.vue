<template>
    <div id="app" class="container">
        <navbar/>
        <div class="content p-4">
            <router-view/>
        </div>

    </div>
</template>

<style>
#app {
    margin: 0 auto;
    box-sizing: border-box;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
<script>
import Navbar from "@/components/Navbar";

export default {
    components: {Navbar}
}
</script>