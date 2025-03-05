<script lang="ts" setup>
import type { ViewportNames } from '~/shared/consts/viewport';
import { VIEWPORT_SIZES } from '~/shared/consts/viewport';

interface Breakpoint {
	src: string;
	mediaQuery: 'max-width' | 'min-width';
	breakpoint: ViewportNames;
}

interface Props {
	src: string;
	width: number;
	height: number;
	alt?: string;
	loading?: 'lazy' | 'eager';
	images?: Breakpoint[];
	objectFit?: 'contain' | 'cover';
}

const {
	width,
	height,
	alt = 'alt',
	loading = 'lazy',
	objectFit = 'cover',
} = defineProps<Props>();

const widthStyle = `${width / 16}rem`;
const aspectRatio = `${width} / ${height}`;
</script>

<template>
	<picture class="img">
		<source
			v-for="(image, key) in images"
			:key
			:srcset="image.src"
			:media="`(${image.mediaQuery}: ${image.mediaQuery === 'max-width' ? VIEWPORT_SIZES[image.breakpoint] / 16 : VIEWPORT_SIZES[image.breakpoint] / 16 + 0.1}em)`"
		>
		<img
			class="img__image"
			:src="src"
			:width
			:height
			:alt
			:loading
		>
	</picture>
</template>

<style scoped lang="sass">
.img
	--width: v-bind(widthStyle)
	--aspect-ratio: v-bind(aspectRatio)
	--radius: 0
	--object-fit: v-bind(objectFit)
	--object-position: center
	//-----------------
	display: block
	width: var(--width)
	max-width: 100%
	height: auto
	aspect-ratio: var(--aspect-ratio)
	overflow: hidden
	border-radius: var(--radius)

	// &--scale
	// 	--scale: 1
	// 	//-----------------

	// 	.img
	// 		&__image
	// 			transition: scale .3s
	// 			scale: var(--scale)

	&__image
		display: block
		width: 100%
		height: 100%
		object-fit: var(--object-fit)
		object-position: var(--object-position)
</style>
