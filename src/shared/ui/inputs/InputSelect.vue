<script setup lang="ts">
import Multiselect from '@vueform/multiselect';

type MultiselectProps = InstanceType<typeof Multiselect>['$props'];

interface Props {
	id?: string;
	name: string;
	label?: string;
	required?: boolean;
	readonly?: boolean;
	placeholder?: MultiselectProps['placeholder'];
	options?: MultiselectProps['options'];
	mode?: MultiselectProps['mode'];
	groups?: MultiselectProps['groups'];
	searchable?: MultiselectProps['searchable'];
	disabled?: MultiselectProps['disabled'];
	loadingSelect?: MultiselectProps['loading'];
	loading?: boolean;
	labelProp?: MultiselectProps['label'];
	valueProp?: MultiselectProps['valueProp'];
	canClear?: MultiselectProps['canClear'];
	delay?: MultiselectProps['delay'];
	filterResults?: MultiselectProps['filterResults'];
	resolveOnLoad?: MultiselectProps['resolveOnLoad'];
}

const {
	id,
	searchable = false,
	loadingSelect = false,
	mode = 'single',
	groups = false,
	name,
} = defineProps<Props>();

const modelValue = defineModel<string | string[]>();

const inputId = id ?? useId();

const {
	handleBlur,
	handleChange,
	errors,
} = useField(name, undefined, {
	initialValue: modelValue,
});

function handleChangeVeevalidate(value: any) {
	handleChange(value, true);
}
</script>

<template>
	<SelectTemplate :id="inputId" :label :errors :required :loading>
		<Multiselect
			:id="inputId"
			v-model="modelValue"
			class="input-select"
			:class="[{ 'is-error': errors.length }, { 'is-readonly': readonly }]"
			:placeholder
			:options
			:mode
			:groups
			:hide-selected="false"
			:caret="!loadingSelect"
			:searchable
			:disabled="disabled || readonly"
			:loading="loadingSelect"
			:label="labelProp"
			:value-prop="valueProp"
			:can-clear
			:delay
			:filter-results
			:resolve-on-load
			no-results-text="Ничего не найдено"
			no-options-text="Нет вариантов для выбора"
			@change="handleChangeVeevalidate"
			@blur="handleBlur"
		/>
	</SelectTemplate>
</template>

<style lang="sass" scoped>
</style>
