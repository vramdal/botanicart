export default {
    name: 'galleri',
    title: 'Galleri',
    type: 'object',
    fields: [
        {
            name: 'bilder',
            title: "Bilder",
            type: 'array',
            of: [
                {
                    title: 'Bilde',
                    type: 'reference',
                    to: [{type: 'tegning'}]
                }
            ]
        }
    ]
}