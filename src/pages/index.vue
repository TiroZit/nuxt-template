<script setup lang="ts">
</script>

<template>
	<!--	<UButton label="test" /> -->
	<!--	<ButtonUi text="button" link href="/" /> -->
	<ButtonUi label="button" />
	<!--	<ButtonUi label="link" :variants="['button&#45;&#45;link']" /> -->
	<!--	<ImgTemplate src="/favicons/favicon.svg" :width="90" :height="90" object-fit="contain" /> -->
	<VideoTemplate :video="{ poster: 'https://images.unsplash.com/photo-1682687982134-2ac563b2228b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', sources: [{ src: 'https://www.shutterstock.com/shutterstock/videos/1075356548/preview/stock-footage-ice-hockey-rink-arena-professional-forward-player-breaks-defense-hitting-puck-with-stick-scores.mp4', type: 'video/mp4' }] }" :width="600" :height="400" />
</template>

<style scoped lang="sass">

</style>
