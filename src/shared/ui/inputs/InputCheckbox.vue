<script setup lang="ts">
interface Props {
	id?: string;
	label?: string;
	text?: string;
	readonly?: boolean;
	disabled?: boolean;
	name: string;
	required?: boolean;
	title?: string;
}

const { id, name } = defineProps<Props>();

const modelValue = defineModel<boolean>();

const inputId = id ?? useId();

const {
	handleChange,
	errors,
} = useField(name, undefined, {
	type: 'checkbox',
	checkedValue: modelValue,
});
</script>

<template>
	<InputTemplate :label :errors :required tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<label
			class="input-check input-check--checkbox"
			:title
			:class="[
				{ active: modelValue },
				{ error: errors.length },
				{ disabled },
				{ readonly },
			]"
		>
			<input
				:id="inputId"
				v-model="modelValue"
				type="checkbox"
				:disabled="disabled || readonly"
				:name
				:readonly
				class="input-check__input"
				@change="handleChange(modelValue)"
			>
			<span class="input-check__checkmark input-check__checkmark--checkbox" />
			<span class="input-check__value">
				{{ text }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>
