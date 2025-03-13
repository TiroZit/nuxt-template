<script setup lang="ts">
import type { Props } from '~/shared/ui/button/button.types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
});
const emit = defineEmits<{
	click: [];
}>();

const nuxtLinkProps = reactiveOmit(
	props,
	'variants',
	'type',
	'label',
	'iconLeft',
	'iconRight',
	'disabled',
	'loading',
	'link',
	'noPrefetch',
);

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();
</script>

<template>
	<DefineTemplate>
		<Icon v-if="iconLeft" :name="`icons:${iconLeft}`" class="button__icon" />
		<span v-if="label" class="button__text" v-html="label" />
		<Icon v-if="iconRight" :name="`icons:${iconRight}`" class="button__icon" />
	</DefineTemplate>

	<NuxtLink custom>
		<template v-if="to">
			<NuxtLink v-bind="nuxtLinkProps" class="button">
				<ReuseTemplate />
			</NuxtLink>
		</template>
		<button
			v-else
			class="button"
			:class="[{ loading }, ...variants || '']"
			:disabled="disabled || loading"
			:type
			@click="emit('click')"
		>
			<ReuseTemplate />
			<LoaderUi v-show="loading" class="button__icon" />
		</button>
	</NuxtLink>
</template>

<style scoped lang="sass">
@import 'button'
</style>
