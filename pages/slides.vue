<template>
  <div class="bg-gray-900 text-white min-h-screen">

    <h1 class="lg:text-8xl md:text-7xl sm:text-3xl font-bold pt-5 pl-9"><span class="text-yellow-500">| </span>Announcement</h1>
    <!-- Border container -->
    
    <TextSlide :slides :currentSlide />

  </div>
  </template>
  

<script setup>
const { slides, fetchSlides, setupRealtime } = useSlides()
const currentIndex = ref(0)

const currentSlide = computed(() => {
  if (!slides.value.length) return { title: '', content: '' }
  return slides.value[currentIndex.value % slides.value.length]
})

onMounted(async () => {
  await fetchSlides()
  setupRealtime()

  // Rotate slides every 5 seconds
  setInterval(() => {
    if (slides.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length
    }
  }, 5000)
})
</script>
