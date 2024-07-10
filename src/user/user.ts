import { DocumentReference } from "firebase/firestore"

export class User {
    readonly id: string
    readonly name: string
    readonly surname: string
    readonly saved: DocumentReference[]
}

export class UserLogin {
    login: string
    password: string
}