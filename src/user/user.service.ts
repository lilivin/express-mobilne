import { Injectable } from '@nestjs/common';
import { firebase } from '../firebaseConfig';
import { getDocs, query } from "firebase/firestore"
import { User } from './user';

@Injectable()
export class UserService {
    userRef = firebase.firestore().collection('user');

    async findAll() {
        const q = query(this.userRef);
        const data = await getDocs(q);
        let users = [];
        data.docs.map(doc => {
            const user = {
                id: doc.id,
                ...doc.data()
            };
            users.push(user)
        });
        return users;
    }

    async find(id: string){
        const q = await this.userRef.doc(id).get();
        const user = {
            id,
            ...q.data()
        }
        return user;
    }

    async create(user: User){
        const savedRefs = user.saved.map(filmId => firebase.firestore().doc('film/' + filmId));
        return await this.userRef.add({
            name: user.name,
            surname: user.surname,
            saved: savedRefs
        })
    }

    async login(email, password){
        let token = '';
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                user.getIdToken().then(res => {
                    token = res
                })
            })

        return token;
    }

    async delete(id: string){
        return this.userRef.doc(id).delete();
    }

    async put(user: User){
        const savedRefs = user.saved.map(filmId => firebase.firestore().doc('film/' + filmId));
        return await this.userRef.doc(user.id).update({
            name: user.name,
            surname: user.surname,
            saved: savedRefs
        });
    }
}
