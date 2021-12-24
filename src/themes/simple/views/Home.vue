<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
      <h5>{{ contextrole }}</h5>
    </header>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
      contextrole:"",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data.msg;
      },
      (error) => {
        this.content = error.message + " (" +  error.response.data + ")";
      }
    );

  },
};
</script>
