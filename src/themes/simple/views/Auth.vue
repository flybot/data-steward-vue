<template>
	<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-sm-center h-100">
				<div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
					<div class="text-center mt-5 mb-3">
						<img
							id="profile-img"
							src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
							class="profile-img-card"
						/>
					</div>
					<router-view></router-view>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Auth',
}
</script>
