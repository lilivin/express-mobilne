import { DocumentReference } from "firebase/firestore"

export class Film {
    id: string
    title: string
    subtitle: string
    content: string
    image: string
    category: DocumentReference
    director: DocumentReference
    platforms: DocumentReference[]
}
