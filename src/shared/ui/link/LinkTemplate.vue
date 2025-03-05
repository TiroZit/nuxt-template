<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

interface Props extends NuxtLinkProps {
	text?: string;
	iconLeft?: string;
	iconRight?: string;
}

const props = defineProps<Props>();
</script>

<template>
	<NuxtLink
		v-bind="{
			...props,
			...(props.noPrefetch ? { noPrefetch: true } : { prefetch: true }),
		}"
		class="link"
	>
		<Icon v-if="iconLeft" :name="`icons:${iconLeft}`" class="link__icon" />
		<span class="link__text" v-html="text" />
		<Icon v-if="iconRight" :name="`icons:${iconRight}`" class="link__icon" />
	</NuxtLink>
</template>

<style scoped lang="sass">
@import 'link'
</style>
