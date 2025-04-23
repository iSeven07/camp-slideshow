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
        const { error } = await $supabase
            .from('slides')
            .insert([{ title, content }])

        if (error) {
            console.error('Error adding slide:', error.message)
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
        }
    }

    const setupRealtime = () => {
        const { $supabase } = useNuxtApp()

        $supabase
            .channel('slides-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'slides' },
                (payload) => {
                    console.log('Realtime change:', payload)

                    if (payload.eventType === 'INSERT') {
                        slides.value.push(payload.new)
                    } else if (payload.eventType === 'DELETE') {
                        slides.value = slides.value.filter(
                            (slide) => slide.id !== payload.old.id
                        )
                    } else if (payload.eventType === 'UPDATE') {
                        const index = slides.value.findIndex((s) => s.id === payload.new.id)
                        if (index !== -1) {
                            slides.value[index] = payload.new
                        }
                    }
                }
            )
            .subscribe()
    }

    return {
        slides,
        fetchSlides,
        addSlideToStore,
        removeSlideFromStore,
        setupRealtime,
    }
}
