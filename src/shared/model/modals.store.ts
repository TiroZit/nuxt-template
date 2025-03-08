export const useModalsStore = defineStore('modals', () => {
	const modalsRegister = ref(new Set<string>());
	const openedModals = ref(new Set<string>());
	const bodyLocked = ref(false);
	const currentGallerySlide = ref<number | null>(null);
	const animationDuration = ref(450);

	const isModalOpened = (modalName: string) => openedModals.value.has(modalName);

	const hasActiveModals = computed(() => openedModals.value.size > 0);

	function registerModal(modalName: string) {
		if (modalsRegister.value.has(modalName))
			throw new Error(`${modalName} : has already been registered`);
		modalsRegister.value.add(modalName);
	}

	function unregisterModal(modalName: string) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName} : has not been registered`);

		if (openedModals.value.has(modalName))
			closeModal(modalName);

		modalsRegister.value.delete(modalName);
	}

	function openModal(modalName: string) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName} : has not been registered`);

		if (openedModals.value.has(modalName)) {
			console.error(`${modalName} : has already been opened`);
			return;
		}

		openedModals.value.add(modalName);

		if (!bodyLocked.value)
			_lockBody();
	}

	function closeModal(modalName: string) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName} : has not been registered`);

		if (!openedModals.value.has(modalName)) {
			console.error(`${modalName} : has not been opened`);
			return;
		}

		openedModals.value.delete(modalName);

		if (!hasActiveModals.value && bodyLocked.value) {
			setTimeout(() => {
				_unlockBody();
			}, animationDuration.value);
		}
	}

	function _lockBody() {
		document.body.classList.add('modal-lock');
		bodyLocked.value = true;
	}

	function _unlockBody() {
		document.body.classList.remove('modal-lock');
		bodyLocked.value = false;
	}

	function openGalleryModal(modalName: string, slide: number) {
		currentGallerySlide.value = slide;
		openModal(modalName);
	}

	return {
		modalsRegister,
		openedModals,
		bodyLocked,
		currentGallerySlide,
		animationDuration,
		registerModal,
		unregisterModal,
		openModal,
		closeModal,
		openGalleryModal,
		isModalOpened,
		hasActiveModals,
	};
});
