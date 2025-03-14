import type { RouteLocationRaw, RouterLinkProps } from '#vue-router';
import type { ButtonHTMLAttributes } from 'vue';

interface NuxtLinkProps extends Omit<RouterLinkProps, 'to'> {
	to?: RouteLocationRaw;
	external?: boolean;
	target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
	rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null;
	noRel?: boolean;
	prefetchedClass?: string;
	prefetch?: boolean;
	prefetchOn?: 'visibility' | 'interaction' | Partial<{
		visibility: boolean;
		interaction: boolean;
	}>;
	noPrefetch?: boolean;
}

type Variant =
	'link' |
	'link-underlined'
;

export interface Props extends NuxtLinkProps {
	variant?: Variant;
	type?: ButtonHTMLAttributes['type'];
	label?: string;
	iconLeft?: string;
	iconRight?: string;
	disabled?: boolean;
	loading?: boolean;
	link?: boolean;
}
