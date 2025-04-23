<template>
    <div class="card fixed inset-0 pointer-events-none text-white">
        <transition name="slide" mode="out-in">
            <div v-if="slides.length" :key="currentSlide.title + currentSlide.content"
                class="absolute inset-y-[150px] inset-x-[70px] border-4 border-white bg-gray-800 shadow-2xl  shadow-black rounded-xl p-5 text-left transition-transform duration-1000 ease-in-out">
                <h1 class="text-5xl font-bold mb-4 text-center">{{ currentSlide.title }}</h1>
                <hr class="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm md:my-10 dark:bg-gray-700">
                <p class="text-3xl">{{ currentSlide.content }}</p>
            </div>
            <div v-else key="loading"
                class="absolute inset-y-[150px] inset-x-[70px] border-4 border-white rounded-xl p-5">
                <p>Loading or no slides found...</p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        slides: {
            type: Array,
            required: true,
        },
        currentSlide: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.slide-enter-from {
    transform: translateX(100%);
}

.slide-enter-active {
    transition: transform 0.7s ease-in-out;
}

.slide-enter-to {
    transform: translateX(0%);
}

.slide-leave-from {
    transform: translateX(50%);
}

.slide-leave-active {
    transition: transform 0.7s ease-in-out;
}

.slide-leave-to {
    transform: translateX(-150%);
}
</style>