<script setup lang="ts">
interface Props {
	id?: string;
	label?: string;
	errors?: string[];
	required?: boolean;
	loading?: boolean;
}

defineProps<Props>();
</script>

<template>
	<InputTemplate :id :label :errors :required :loading>
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<slot />

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>
