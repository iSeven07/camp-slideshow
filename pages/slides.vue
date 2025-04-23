<template>
    <div class="min-h-screen bg-black text-white flex items-center justify-center">
      <div v-if="slides.length" class="text-center">
        <h1 class="text-5xl font-bold mb-4">{{ currentSlide.title }}</h1>
        <p class="text-2xl">{{ currentSlide.content }}</p>
      </div>
      <div v-else>
        <p>Loading or no slides found...</p>
      </div>
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
