import { Injectable } from '@nestjs/common';
import { firebase } from '../firebaseConfig';
import { getDocs, query } from "firebase/firestore"
import { Actor } from './actor';

@Injectable()
export class ActorService {
    actorRef = firebase.firestore().collection('actor');
    filmActorRef = firebase.firestore().collection('film_actor');

    async findAll() {
        const q = query(this.actorRef);
        const data = await getDocs(q);
        let actors = [];
        data.docs.map(doc => {
            const actor = {
                id: doc.id,
                ...doc.data()
            };
            actors.push(actor)
        });
        return actors;
    }


    async find(id: string){
        const q = await this.actorRef.doc(id).get();
        const actor = {
            id,
            ...q.data()
        }
        return actor;
    }

    async findFilms(id: string){
        const actorDocRef = this.actorRef.doc(id);
        const q = this.filmActorRef.where("actor", "==", actorDocRef);
        const data = await getDocs(q);
        let films = [];
        const filmPromises = data.docs.map(async (doc) => {
            const filmPath = doc.data().film.path;
            const filmData = await firebase.firestore().doc(filmPath).get();
            return {
                id: doc.data().film.id,
                title: filmData.data().title,
                image: filmData.data().image
            }
        });
    
        films = await Promise.all(filmPromises);
        return films;
    }

    async create(actor: Actor){
        return await this.actorRef.add({
            name: actor.name,
            surname: actor.surname,
            image: actor.image,
            description: actor.description,
            shortDescription: actor.shortDescription
        })
    }

    async delete(id: string){
        return this.actorRef.doc(id).delete();
    }

    async put(actor: Actor){
        return await this.actorRef.doc(actor.id).update({
            name: actor.name,
            surname: actor.surname,
            image: actor.image,
            description: actor.description,
            shortDescription: actor.shortDescription
        });
    }
}
