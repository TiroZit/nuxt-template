<script setup lang="ts">
interface Props {
	label?: string;
	tag?: 'label' | 'span';
	id?: string;
	errors?: string[];
	required?: boolean;
	loading?: boolean;
}

const {
	tag = 'label',
	errors = [],
} = defineProps<Props>();
</script>

<template>
	<div class="default-input" :class="{ required, loading }">
		<Component :is="tag" v-if="label" :for="id" class="default-input__label">
			<slot name="label" :label-value="label">
				<span class="default-input__label-text">{{ label }}</span>
			</slot>
		</Component>
		<div class="default-input__input">
			<slot />
			<slot name="action" />
		</div>
		<ul v-if="errors.length" class="default-input__errors">
			<li v-for="error in errors" :key="error" class="default-input__error" v-html="error" />
		</ul>
		<div v-if="$slots.underInput" class="default-input__bottom">
			<slot name="underInput" />
		</div>
	</div>
</template>

<style lang="sass" scoped>
</style>
