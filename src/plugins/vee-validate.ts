import { confirmed, email, max, min, required } from '@vee-validate/rules';
import { configure, defineRule } from 'vee-validate';

export default defineNuxtPlugin(() => {
	defineRule('required', required);
	defineRule('email', email);
	defineRule('min', min);
	defineRule('max', max);
	defineRule('passwordConfirmed', confirmed);
	defineRule('phone', (value: string | undefined) => {
		if (!value)
			return true;

		if (value.length < 18) {
			return 'Некорректный номер телефона';
		}
		return true;
	});

	configure({
		generateMessage: (context) => {
			const paramValue = context.rule?.params && Array.isArray(context.rule.params) ? context.rule.params[0] : undefined;
			const messages: Record<string, string> = {
				required: 'Это поле обязательно для заполнения.',
				email: 'Введите корректный адрес электронной почты.',
				min: `Минимальное количество символов: ${paramValue ?? ''}`,
				max: `Максимальное количество символов: ${paramValue ?? ''}`,
				passwordConfirmed: `Пароли не совпадают`,
			};

			const ruleName = context.rule?.name;

			return ruleName && messages[ruleName]
				? messages[ruleName]
				: `Ошибка валидации для поля ${context.field}.`;
		},
	});
});
