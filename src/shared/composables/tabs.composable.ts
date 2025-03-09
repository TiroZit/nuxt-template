type Tab = number | string;

interface UseTabsProps {
	activeClass?: string;
	initialTab?: Tab;
	isHover?: boolean;
}

export function useTabs(props: UseTabsProps) {
	const activeTab = ref<Tab>(props.initialTab || '');

	const setTab = (event: PointerEvent, tab: Tab): void => {
		activeTab.value = tab;
		if (event.target instanceof HTMLElement) {
			event.target.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center',
			});
		}
	};

	const tabEvents = computed(() => (tab: Tab) => ({
		...(props.isHover
			? { mouseover: (e: PointerEvent) => setTab(e, tab) }
			: { click: (e: PointerEvent) => setTab(e, tab) }),
	}));

	const getActiveClass = (tab: Tab): string =>
		activeTab.value === tab ? props.activeClass || 'active' : '';

	return { activeTab, tabEvents, getActiveClass };
}
