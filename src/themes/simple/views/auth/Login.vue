<template>
	<div class="col-md-12">
		<div class="card card-container  px-5 pt-3">

			<h1 class="fs-4 card-title fw-bold mb-4 text-secondary">{{ $t("auth.login") }}</h1>

			<Form @submit="handleLogin" :validation-schema="schema">

				<div class="mb-3">
					<label for="username" class="text-muted">{{ $t("auth.field.name") }}</label>
					<Field name="username" type="text" class="form-control" />
					<ErrorMessage name="username" class="error-feedback" />
				</div>

				<div class="mb-3">
					<label for="password" class="text-muted">{{ $t("auth.field.password") }}</label>
					<Field name="password" type="password" class="form-control" />
					<ErrorMessage name="password" class="error-feedback" />
				</div>

				<div class="d-flex align-items-center">
					<button class="btn btn-primary ms-auto mt-3" :disabled="loading">
						<span v-show="loading" class="spinner-border spinner-border-sm"></span>
						<span>{{ $t("auth.login") }}</span>
					</button>
				</div>

				<div class="mb-3">
					<div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
				</div>
			</Form>

			<div class="card-footer border-0 row mt-4">
				<div class="col">
					<localized-link :to="{ name: 'Forgot' }" class="btn btn-outline-warning">{{ $t("auth.forgot") }}</localized-link>
				</div>
				<div class="col">
					<localized-link :to="{ name: 'Register' }" class="btn btn-outline-info">{{ $t("auth.message.create_account") }}</localized-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
	name: "Login",
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const schema = yup.object().shape({
			username: yup.string().required(this.$t("auth.message.name_required")),
			password: yup.string().required(this.$t("auth.message.password_required")),
		});

		return {
			loading: false,
			message: "",
			schema,
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
	},
	created() {
		if (this.loggedIn) {
			this.$router.push("/auth/profile");
		}
	},
	methods: {
		handleLogin(user) {
			this.loading = true;

			this.$store.dispatch("auth/login", user).then(
				() => {
					this.$router.push("/auth/profile");
				},
				(error) => {
					this.loading = false;
					this.message =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
				}
			);
		},
	},
};
</script>
