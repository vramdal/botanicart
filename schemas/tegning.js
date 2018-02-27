export default {
    name: 'tegning',
    title: 'Tegning',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Norsk navn',
            type: 'string'
        },
        {
            name: 'latin',
            title: 'Latin',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'URL-navn',
            type: 'slug',
            options: {
                source: 'latin',
                maxLength: 96,
                auto: true
            }

        },
        {
            name: 'produkttype',
            title: 'Produkttype',
            type: 'string',
            options: {
                list: ['tegning', 'kort', 'plansje']
            }
        },
        {
            name: 'image',
            title: 'Fil',
            type: 'image',
            options: {
                hotspot: true
            }

        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            subtitle: 'latin',
            description: 'produkttype'
        }
    }

}