<template>
	<Icon class="loader" name="icons:loader" />
</template>

<style scoped lang="sass">
.loader
	--width: 24px
	--height: 24px
	position: absolute
	top: 50%
	left: 50%

	display: block
	flex: none

	width: var(--width)
	height: var(--height)

	animation: spinner 0.7s linear infinite
	translate: -50% -50%

@keyframes spinner
	0%
		rotate: 0

	100%
		rotate: 1turn
</style>
