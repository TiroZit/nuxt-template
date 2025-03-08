<script setup lang="ts">
interface Props {
	text?: string;
	iconLeft?: string;
	iconRight?: string;
	loading?: boolean;
	disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
	<button class="btn" :loading :disabled="disabled || loading">
		<Icon v-if="iconLeft" :name="`icons:${iconLeft}`" class="btn__icon" />
		<span v-if="text" class="btn__text" v-html="text" />
		<Icon v-if="iconRight" :name="`icons:${iconRight}`" class="btn__icon" />
		<LoaderUi v-show="loading" class="btn__icon" />
	</button>
</template>

<style scoped lang="sass">
@import 'button'
</style>
