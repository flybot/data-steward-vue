<template>
	<div class="col-md-12">
		<div class="card card-container  px-5 pt-3">
			<h1 class="fs-4 card-title fw-bold mb-4 text-secondary">{{ $t("auth.register") }}</h1>

			<Form @submit="handleRegister" :validation-schema="schema">

				<div v-if="!successful">

					<div class="form-group mb-3">
						<label for="username" class="mb-2 text-muted">{{ $t("auth.field.name") }}</label>
						<Field name="username" type="text" class="form-control" />
						<ErrorMessage name="username" class="error-feedback" />
					</div>

					<div class="form-group mb-3">
						<label for="email" class="mb-2 text-muted">{{ $t("auth.field.email") }}</label>
						<Field name="email" type="email" class="form-control" />
						<ErrorMessage name="email" class="error-feedback" />
					</div>

					<div class="form-group mb-3">
						<label for="password" class="mb-2 text-muted">{{ $t("auth.field.password") }}</label>
						<Field name="password" type="password" class="form-control" />
						<ErrorMessage name="password" class="error-feedback" />
					</div>

					<p class="form-text text-muted mb-3">
						{{ $t("auth.message.agree_terms") }}
					</p>

					<div class="d-flex align-items-center">
						<button class="btn btn-primary ms-auto mt-3" :disabled="loading">
							<span v-show="loading" class="spinner-border spinner-border-sm"></span>
							{{ $t("auth.register") }}
						</button>
					</div>

					<div class="card-footer py-3 border-0">
						<div class="text-center">
							{{ $t("auth.message.have_account") }} 
                               <localized-link :to="{name: 'Login'}" class="nav-link">{{ $t("auth.login") }}</localized-link>
						</div>
					</div>

				</div>
			</Form>

			<div
				v-if="message"
				class="alert"
				:class="successful ? 'alert-success' : 'alert-danger'"
			>{{ message }}</div>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
	name: "Register",
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const schema = yup.object().shape({
			username: yup
				.string()
				.required(this.$t("auth.message.name_required"))
				.min(3, this.$t("auth.message.name_min_length"))
				.max(20, this.$t("auth.message.name_max_length")),
			email: yup
				.string()
				.required(this.$t("auth.message.email_required"))
				.email(this.$t("auth.message.email_invalid"))
				.max(50, this.$t("auth.message.email_max_length")),
			password: yup
				.string()
				.required(this.$t("auth.message.password_required"))
				.min(6, this.$t("auth.message.password_min_length"))
				.max(40, this.$t("auth.message.password_max_length")),
		});

		return {
			successful: false,
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
	mounted() {
		if (this.loggedIn) {
			this.$router.push("/auth/profile");
		}
	},
	methods: {
		handleRegister(user) {
			this.message = "";
			this.successful = false;
			this.loading = true;

			this.$store.dispatch("auth/register", user).then(
				(data) => {
					this.message = data.message;
					this.successful = true;
					this.loading = false;
				},
				(error) => {
					this.message =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
					this.successful = false;
					this.loading = false;
				}
			);
		},
	},
};
</script>

