<template>
    <div class="p-8">
        <form @submit.prevent="addSlide" class="mb-6">
            <input v-model="title" placeholder="Title" class="border p-2 mr-2" />
            <input v-model="content" placeholder="Content" class="border p-2 mr-2" />
            <button type="submit" class="bg-blue-500 text-white p-2">Add Slide</button>
        </form>

        <ul>
            <li v-for="slide in slides" :key="slide.id" class="mb-2">
                <strong>{{ slide.title }}</strong>: {{ slide.content }}
                <button @click="removeSlide(slide.id)" class="ml-4 text-red-500">Remove</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
const { slides, fetchSlides, addSlideToStore, removeSlideFromStore, setupRealtime } = useSlides()
const title = ref('')
const content = ref('')

onMounted(async () => {
    await fetchSlides()
    setupRealtime()
})

function addSlide() {
    if (title.value && content.value) {
        console.log('Adding slide:', { title: title.value, content: content.value })
        addSlideToStore({
            title: title.value,
            content: content.value
        }).then(() => {
            console.log('Slide added')
        }).catch((e) => {
            console.error('Error adding slide:', e)
        })
        title.value = ''
        content.value = ''
    }
}


function removeSlide(id) {
    removeSlideFromStore(id)
}
</script>