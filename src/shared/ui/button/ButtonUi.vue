<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

interface Props extends Omit<NuxtLinkProps, 'noPrefetch'> {
	link?: boolean;
	text?: string;
	iconLeft?: string;
	iconRight?: string;
	loading?: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();
const { link, text, iconLeft, iconRight, loading, disabled, ...nuxtLinkProps } = props;

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
</script>

<template>
	<DefineTemplate>
		<Icon v-if="iconLeft" :name="`icons:${iconLeft}`" class="btn__icon" />
		<span v-if="text" class="btn__text" v-html="text" />
		<Icon v-if="iconRight" :name="`icons:${iconRight}`" class="btn__icon" />
	</DefineTemplate>

	<NuxtLinkCustom v-if="link" v-bind="nuxtLinkProps" class="btn" :disabled="disabled">
		<ReuseTemplate />
	</NuxtLinkCustom>

	<button v-else class="btn" :class="{ loading }" :disabled="disabled || loading">
		<ReuseTemplate />
		<LoaderUi v-show="loading" class="btn__icon" />
	</button>
</template>

<style scoped lang="sass">
@import 'button'
</style>
