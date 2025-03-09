<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies';

// https://vueuse.org/integrations/useCookies/
const { set: setCookie, get: getCookie } = useCookies();

const cookieToast = useTemplateRef<HTMLDialogElement>('cookieToast');
const cookieShown = ref(false);

const isCookieConfirmed = computed<boolean>(() => {
	return getCookie('cookieConfirmed') ?? false;
});

onMounted(() => {
	checkCookie();
});

function checkCookie() {
	if (!isCookieConfirmed.value) {
		setTimeout(() => {
			cookieShown.value = true;
		}, 2000);
	}
}

function onConfirmCookie() {
	setCookie('cookieConfirmed', true, {
		path: '/',
		expires: new Date(Date.now() + 2592000000),
	});
	cookieShown.value = false;
}
</script>

<template>
	<teleport to="#teleports">
		<transition name="cookie" :duration="450" appear>
			<dialog v-if="cookieShown" ref="cookieToast" :open="cookieShown" class="cookie-toast">
				<div class="cookie-toast__inner">
					<span class="cookie-toast__text">Мы используем куки, чтобы сделать сайт удобнее для вас</span>
					<ButtonUi class="cookie-toast__btn" text="Хорошо" @click="onConfirmCookie" />
				</div>
			</dialog>
		</transition>
	</teleport>
</template>

<style scoped lang="sass">
.cookie-toast
	position: fixed
	right: 0
	bottom: 40px
	left: 0
	z-index: var(--z-index-modal)

	padding: 14px

	border: none
	border-radius: var(--radius-m)

	background-color: var(--color-neutral-100)

	color: var(--body-color)

	@include media('max', 'tablet')
		bottom: 70px

	@include media('max', 'mobile-xl')
		width: 100%

	&__inner
		display: flex
		align-items: center
		justify-content: space-between
		gap: 14px

	&__text
		font-size: var(--font-size-text-m)
		line-height: var(--line-height-m)

		@include media('max', 'mobile-xl')
			max-width: 165px
			line-height: var(--line-height-s)

.cookie-enter-active,
.cookie-leave-active
	transition: opacity 0.3s ease, transform 0.3s ease

.cookie-enter-from,
.cookie-leave-to
	opacity: 0
	transform: translateY(8px)
</style>
