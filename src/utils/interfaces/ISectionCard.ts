export interface ISectionCard {
    item: {
        id: number,
        name: string,
        color: string,
        background: string
        description: string
        image: string
        href: string
    },
    customClasses?: string
}