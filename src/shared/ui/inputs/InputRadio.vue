<script setup lang="ts">
interface Props {
	id?: string;
	valueProp: string | number;
	name: string;
	label?: string;
	text?: string;
	readonly?: boolean;
	disabled?: boolean;
	required?: boolean;
	title?: string;
}

const { id, name, valueProp } = defineProps<Props>();

const modelValue = defineModel<string | number>();

const inputId = id ?? useId();

const {
	value: inputValue,
	handleChange,
	errors,
} = useField(name, undefined, {
	type: 'radio',
	initialValue: modelValue.value || valueProp,
});
</script>

<template>
	<InputTemplate :id="inputId" :label :errors :required tag="span">
		<template v-if="$slots.label" #label="{ labelValue }">
			<slot name="label" :label-value />
		</template>

		<label
			class="input-check input-check--radio"
			:title
			:class="[
				{ active: modelValue === valueProp },
				{ error: errors.length },
				{ disabled },
				{ readonly },
			]"
		>
			<input
				:id="inputId"
				v-model="modelValue"
				type="radio"
				:disabled="disabled || readonly"
				:readonly
				:name
				:value="valueProp"
				class="input-check__input"
				:checked="inputValue === valueProp"
				@change="handleChange(modelValue)"
			>
			<span class="input-check__checkmark input-check__checkmark--radio" />
			<span class="input-check__value">
				{{ text || valueProp }}
			</span>
		</label>

		<template v-if="$slots.action" #action>
			<slot name="action" />
		</template>
	</InputTemplate>
</template>
