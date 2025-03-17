<script setup lang="ts">
import { phoneMask } from '~/shared/consts/masks';

const validationSchema = {
	phone: 'phone',
	select: 'required',
	checkbox: 'required',
	radio: 'required',
};

// function onSubmit(values: object) {
// 	alert(JSON.stringify(values, null, 2));
// }

const radio = ref('1');
</script>

<template>
	<Form v-slot="{ isSubmitting }" :validation-schema>
		<InputSelect
			name="select"
			:options="[{ label: 'Проектирование', value: '1' }]"
			class="form__item form__item--full"
			label="Направление"
			placeholder="Выбрать"
		/>
		<InputText name="email" placeholder="Email" />
		<InputText v-mask="phoneMask" name="phone" placeholder="Password" />
		<InputText name="passwordRepeat" placeholder="Password" />
		<InputCheckbox name="checkbox" />
		<InputRadio v-model="radio" name="radio" value-prop="1" />
		<InputRadio v-model="radio" name="radio" value-prop="2" />

		<ButtonUi label="Submit" :loading="isSubmitting" type="submit" />
	</Form>
</template>

<style scoped lang="sass">

</style>
