export default {
    name: 'galleri',
    title: 'Bildeliste',
    type: 'object',
    fields: [
        {
            name: "presentation",
            title: "Presentasjon",
            type: 'string',
            options: {
                list: ['slideshow', 'galleri']
            }

        },
        {
            name: 'bilder',
            title: "Bilder",
            type: 'array',
            of: [
                {
                    title: 'Bilde',
                    name: 'bilde',
                    type: 'reference',
                    to: [{type: 'tegning'}]
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'type'
        }
    }

}