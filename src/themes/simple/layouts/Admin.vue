<template>
   <language-switcher v-slot="{ links }" tag="ul" active-class="my-custom-class">
  <li :class="link.activeClass" v-for="link in links" :key="link.langIndex">
    <a :href="link.url">{{ link.langIndex }}</a>
  </li>
</language-switcher>

    <main class="container flex-shrink-0 mb-4">
        <router-view />
    </main>

</template>