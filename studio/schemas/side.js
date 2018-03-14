export default {
    name: "side",
    title: "Side",
    type: "document",
    fields: [
        {
            name: "tittel",
            title: "Tittel",
            type: "string"
        },
        {
            name: "sidetype",
            title: "Sidetype",
            type: "string",
            options: {
                list: ['artikkel', 'galleri', 'forside'],
                layout: "radio"
            }
        },
        {
            name: "menypunkttekst",
            title: "Menypunkt-tekst",
            type: "string",
            options: {
                source: "tittel"
            }
        },
        {
            name: "slug",
            title: "Side-URL",
            type: "slug",
            options: {
                source: "tittel",
                maxLength: 96,
                auto: true
            }
        },
        {
            name: "tekst",
            title: "Tekst",
            type: "array",
            of: [
                {type: 'block'},
                {type: 'galleri'}
            ],
            styles: [{title: 'Normal', value: 'normal'}],
            lists: []

        }
    ],
    preview: {
        select: {
            title: 'tittel'
        }
    }
}