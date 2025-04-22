<template>
    <div class="min-h-screen bg-black text-white flex items-center justify-center">
        <div v-if="slides.length" class="text-center transition duration-500 ease-in-out">
            <h1 class="text-5xl font-bold mb-4">{{ currentSlide.title }}</h1>
            <p class="text-2xl">{{ currentSlide.content }}</p>
        </div>
    </div>
</template>

<script setup>
const { slides, fetchSlides } = useSlides()
const currentIndex = ref(0)

const currentSlide = computed(() => slides.value[currentIndex.value])

onMounted(async () => {
    await fetchSlides()

    setInterval(() => {
        if (slides.value.length > 0) {
            currentIndex.value = (currentIndex.value + 1) % slides.value.length
        }
    }, 5000)

    // Auto refresh slides every 10 seconds
    setInterval(() => {
        fetchSlides()
    }, 10000)
})
</script>