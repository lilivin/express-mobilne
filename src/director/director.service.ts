import { Injectable } from '@nestjs/common';
import { firebase } from '../firebaseConfig';
import { getDocs, query } from "firebase/firestore"
import { Director } from './director';

@Injectable()
export class DirectorService {
    directorRef = firebase.firestore().collection('director');
    filmRef = firebase.firestore().collection('film');

    async findAll() {
        const q = query(this.directorRef);
        const data = await getDocs(q);
        let directors = [];
        data.docs.map(doc => {
            const director = {
                id: doc.id,
                ...doc.data()
            };
            directors.push(director)
        });
        return directors;
    }


    async find(id: string){
        const q = await this.directorRef.doc(id).get();
        const director = {
            id,
            ...q.data()
        }
        return director;
    }

    async findFilms(id: string){
        const directorDocRef = this.directorRef.doc(id);
        const q = this.filmRef.where("director", "==", directorDocRef);
        const data = await getDocs(q);
        let films = [];
        const filmPromises = data.docs.map(async (doc) => {
            const filmData = doc.data();
            return {
                id: doc.id,
                title: filmData.title,
                image: filmData.image
            }
        });
    
        films = await Promise.all(filmPromises);
        return films;
    }

    async create(director: Director){
        return await this.directorRef.add({
            name: director.name,
            surname: director.surname,
            image: director.image,
            shortDescription: director.shortDescription,
            description: director.description
        })
    }

    async delete(id: string){
        return this.directorRef.doc(id).delete();
    }

    async put(director: Director){
        return await this.directorRef.doc(director.id).update({
            name: director.name,
            surname: director.surname,
            image: director.image,
            shortDescription: director.shortDescription,
            description: director.description
        });
    }
}
