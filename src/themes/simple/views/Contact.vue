<template>
  <div id="aaa" class="p-5">
    <h1>This is an contact page</h1>
     <h3>{{ content }}</h3>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: 'About',
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getUserRoles().then(
      (response) => {
        this.content = response.data[0].name;
      },
      (error) => {
        this.content = error.message + " (" +  error.response.data + ")";
      }
    );

  },
}
</script>

<style scoped>
  #aaa { height: 2000px; }
</style>