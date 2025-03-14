export const useModalsStore = defineStore('modals', () => {
	const modalsRegister = ref<Set<string>>(new Set());
	const openedModals = ref<Set<string>>(new Set());
	const bodyLocked = ref(false);
	const currentGallerySlide = ref<number | null>(null);
	const animationDuration = ref(450);
	const modalData = ref<Map<string, unknown>>(new Map());

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

	function openModal(modalName: string, data?: unknown) {
		if (!modalsRegister.value.has(modalName))
			throw new Error(`${modalName} : has not been registered`);

		if (openedModals.value.has(modalName)) {
			console.error(`${modalName} : has already been opened`);
			return;
		}

		openedModals.value.add(modalName);
		if (data)
			modalData.value.set(modalName, data);

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
		modalData.value.delete(modalName);

		if (!hasActiveModals.value && bodyLocked.value) {
			setTimeout(() => {
				_unlockBody();
			}, animationDuration.value);
		}
	}

	function openGalleryModal(modalName: string, slide: number) {
		currentGallerySlide.value = slide;
		openModal(modalName);
	}

	function getModalData<T = unknown>(modalName: string): T | undefined {
		return modalData.value.get(modalName) as T | undefined;
	}

	function _lockBody() {
		document.body.classList.add('modal-lock');
		bodyLocked.value = true;
	}

	function _unlockBody() {
		document.body.classList.remove('modal-lock');
		bodyLocked.value = false;
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
		getModalData,
	};
});
