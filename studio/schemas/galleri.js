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
                    name: 'bilde',
                    type: 'reference',
                    to: [{type: 'tegning'}]
                }
            ]
        }
    ]
}