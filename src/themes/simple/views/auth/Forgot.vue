<template>
	<div class="card shadow-lg">
		<div class="card-body p-5">
			<h1 class="fs-4 card-title fw-bold mb-4 text-secondary">{{ $t("auth.forgot") }}</h1>
			<Form @submit="onSubmit" :validation-schema="schema">
				<div class="mb-3">
					<label class="mb-2 text-muted" for="email">{{ $t("auth.field.email") }}</label>
					<Field name="email" type="email" class="form-control" />
					<ErrorMessage name="email" class="error-feedback" />
				</div>

				<div class="d-flex align-items-center">
					<button type="submit" class="btn btn-primary ms-auto" :disabled="loading">
						<span v-show="loading" class="spinner-border spinner-border-sm"></span>
						<span>{{ $t("auth.message.send_link") }}</span>
					</button>
				</div>
			</Form>
		</div>
		<div class="card-footer py-3 border-0">
			<div class="text-center">
				Remember your password?<br>
				<localized-link :to="{ name: 'Login' }" class="btn btn-outline-info">Login</localized-link>
			</div>
		</div>
	</div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "@/services/user.service";

export default {
	name: 'Forgot', 
	components: {
		Form,
		Field,
		ErrorMessage,
	},
	data() {
		const schema = yup.object().shape({
			email: yup
				.string()
				.required(this.$t("auth.message.email_required"))
				.email(this.$t("auth.message.email_invalid"))
				.max(50, this.$t("auth.message.email_max_length")),
		});

		return {
			loading: false,
			schema,
		}
	},
	methods: {
		onSubmit(form) {
			this.loading = true;
			UserService.addPublicTask("send_password_restore_link", {email: form.email })
			.then(
            (response) => {
				this.loading = false;
				console.log(response);
            });
		}
	}
}
</script>

<style scoped>
</style>