export default {
    name: 'meny',
    title: 'Meny',
    type: 'document',
    fields: [
        {
            name: 'navn',
            title: 'Navn',
            type: 'string'
        },
        {
            name: 'menypunkter',
            title: "Menypunkter",
            type: 'array',
            of: [
                {
                    title: 'Side',
                    name: 'side',
                    type: 'reference',
                    to: [{type: 'side'}]
                }
            ]
        }
    ]
}