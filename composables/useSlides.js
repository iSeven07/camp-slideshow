export const useSlides = () => {
    const slides = useState('slides', () => [])

    const fetchSlides = async () => {
        const res = await $fetch('/api/slides')
        slides.value = res
    }

    const addSlideToStore = async (slide) => {
        const res = await $fetch('/api/slides', {
            method: 'POST',
            body: { action: 'add', ...slide },
        })
        slides.value = res.slides
    }

    const removeSlideFromStore = async (id) => {
        const res = await $fetch('/api/slides', {
            method: 'POST',
            body: { action: 'remove', id },
        })
        slides.value = res.slides
    }

    return {
        slides,
        fetchSlides,
        addSlideToStore,
        removeSlideFromStore
    }
}