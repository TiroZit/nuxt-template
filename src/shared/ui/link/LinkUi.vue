<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

interface Props extends Omit<NuxtLinkProps, 'noPrefetch'> {
	text?: string;
	iconLeft?: string;
	iconRight?: string;
}

const props = defineProps<Props>();
const { text, iconLeft, iconRight, ...nuxtLinkProps } = props;
</script>

<template>
	<NuxtLinkCustom v-bind="nuxtLinkProps" class="link">
		<Icon v-if="iconLeft" :name="`icons:${iconLeft}`" class="link__icon" />
		<span class="link__text" v-html="text" />
		<Icon v-if="iconRight" :name="`icons:${iconRight}`" class="link__icon" />
	</NuxtLinkCustom>
</template>

<style scoped lang="sass">
@import 'link'
</style>
