<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Extractor</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <localized-link to="/" class="nav-link">{{ $t('nav.home') }}</localized-link>
          </li>
          <li class="nav-item">
            <localized-link :to="{ name: 'About' }" class="nav-link">{{ $t('nav.about') }}</localized-link>
          </li>
          <li class="nav-item">
            <localized-link :to="{ name: 'Contact' }" class="nav-link">{{ $t('nav.contact') }}</localized-link>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">{{ $t('nav.search') }}</button>
        </form>
      </div>

      <div class="d-none d-sm-none d-md-none d-lg-block d-xl-block ml-auto">
        <ul class="navbar-nav">
          <language-switcher v-slot="{ links }">
            <li class="nav-item dropdown px-4">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLang"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >{{ this.flags[$i18n.locale] }}</a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLang">
                <li class="nav-item text-center" v-for="link in links" :key="link.langIndex">
                  <router-link
                    :to="link.url"
                    :title="link.langName.toUpperCase()"
                  >{{ this.flags[link.langIndex] }}</router-link>
                </li>
              </ul>
            </li>
          </language-switcher>

          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item px-4">
              <localized-link :to="{ name: 'Login' }" class="nav-link">{{ $t('auth.login') }}</localized-link>
            </li>
          </div>
          <div v-if="currentUser" class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="user" /> {{ currentUser.username }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown01">
                <li>
                  <router-link to="/auth/profile" class="dropdown-item">
                    <font-awesome-icon icon="user" />
                    {{ $t('nav.profile') }}
                  </router-link>
                </li>
                <li> 
                  <a class="dropdown-item" @click.prevent="logOut">
                    <font-awesome-icon icon="sign-out-alt" />
                    {{ $t('auth.logout') }}
                  </a>
                </li>
              </ul>
            </li>

          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// Source link:  https://emojipedia.org/flags/
const coutryFlags = {
  en: "🇺🇸",
  ua: "🇺🇦",
  ru: "🇷🇺"
}

export default {
  data() {
    return {
      flags: coutryFlags
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  min-width: 60px !important;
}
a.nav-link, a.dropdown-item {
  cursor: pointer;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>