import { useNuxtApp } from '#app'

export const useSlides = () => {
    const slides = useState('slides', () => [])

    const fetchSlides = async () => {
        const { $supabase } = useNuxtApp()
        const { data, error } = await $supabase
            .from('slides')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error fetching slides:', error)
        } else {
            slides.value = data
        }
    }

    const addSlideToStore = async ({ title, content }) => {
        const { $supabase } = useNuxtApp()
        const { data, error } = await $supabase
            .from('slides')
            .insert([{ title, content }])

        if (error) {
            console.error('Error adding slide:', error.message)
        } else {
            await fetchSlides()
        }
    }

    const removeSlideFromStore = async (id) => {
        const { $supabase } = useNuxtApp()
        const { error } = await $supabase
            .from('slides')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error removing slide:', error.message)
        } else {
            await fetchSlides()
        }
    }

    // Realtime subscription to listen for changes in the slides table
    const setupRealtime = () => {
        const { $supabase } = useNuxtApp()

        $supabase
            .from('slides')
            .on('INSERT', (payload) => {
                console.log('Slide added:', payload)
                slides.value.push(payload.new)
            })
            .on('DELETE', (payload) => {
                console.log('Slide removed:', payload)
                slides.value = slides.value.filter(slide => slide.id !== payload.old.id)
            })
            .subscribe()
    }

    // Call fetchSlides initially and setup the real-time listener
    onMounted(async () => {
        await fetchSlides()
        setupRealtime()
    })

    return {
        slides,
        fetchSlides,
        addSlideToStore,
        removeSlideFromStore,
    }
}
