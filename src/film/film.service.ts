import { Injectable } from '@nestjs/common';
import { firebase } from '../firebaseConfig';
import { getDoc, getDocs, query } from "firebase/firestore"
import { Film, Review } from './film';

@Injectable()
export class FilmService {
    filmRef = firebase.firestore().collection('film');
    filmActorRef = firebase.firestore().collection('film_actor');
    reviewRef = firebase.firestore().collection('review');
    userRef = firebase.firestore().collection('user');

    async findAll() {
        const q = query(this.filmRef);
        const data = await getDocs(q);
        let films = [];
        const filmsPromises = data.docs.map(async doc => {
            const data = doc.data();
            const categoryDoc: any = await getDoc(data.category);
            return {
                id: doc.id,
                title: data.title,
                subtitle: data.subtitle,
                image: data.image,
                category: {
                    id: categoryDoc.id,
                    name: categoryDoc.data().name
                }
            };
        });
    
        films = await Promise.all(filmsPromises);
        return films;
    }

    async find(id: string){
        const q = await this.filmRef.doc(id).get();
        const filmData = q.data();
        const categoryDoc: any = await getDoc(filmData.category);
        const directorDoc: any = await getDoc(filmData.director);

        const film = {
            id,
            title: filmData.title,
            subtitle: filmData.subtitle,
            content: filmData.content,
            image: filmData.image,
            category: {
                id: categoryDoc.id,
                name: categoryDoc.data().name
            },
            director: {
                id: directorDoc.id,
                name: directorDoc.data().name,
                surname: directorDoc.data().surname,
                shortDescription: directorDoc.data().shortDescription,
                image: directorDoc.data().image
            }
        }
        return film;
    }

    async findActors(id: string){
        const filmDocRef = this.filmRef.doc(id);
        const q = this.filmActorRef.where("film", "==", filmDocRef);
        const data = await getDocs(q);
        let actors = [];
        const actorPromises = data.docs.map(async (doc) => {
            const actorPath = doc.data().actor.path;
            const actorData = await firebase.firestore().doc(actorPath).get();
            return {
                id: doc.data().actor.id,
                ...actorData.data()
            };
        });
    
        actors = await Promise.all(actorPromises);
        return actors;
    }

    async findReviews(id: string){
        const filmDocRef = this.filmRef.doc(id);
        const q = this.reviewRef.where("film", "==", filmDocRef);
        const data = await getDocs(q);
        let reviews = [];
        const reviewsPromises = data.docs.map(async (doc) => {
            // const userPath = doc.data().user.path;
            // const userData = await firebase.firestore().doc(userPath).get();
            return {
                text: doc.data().text,
                user: doc.data().user
            }
        });
    
        reviews = await Promise.all(reviewsPromises);
        return reviews;
    }

    async createReviews(id: string, review: Review){
        const filmDocRef = this.filmRef.doc(id);
        return await this.reviewRef.add({
            film: this.filmRef.doc(review.filmId),
            text: review.text,
            user: review.user,
        });
    }

    async create(film: Film){
        const platformRefs = film.platforms.map(platformId => firebase.firestore().doc('platform/' + platformId));
        return await this.filmRef.add({
            title: film.title,
            image: film.image,
            subtitle: film.subtitle,
            content: film.content,
            director: firebase.firestore().doc('director/' + film.director),
            platforms: platformRefs
        })
    }

    async delete(id: string){
        return this.filmRef.doc(id).delete();
    }

    async put(film: Film){
        const platformRefs = film.platforms.map(platformId => firebase.firestore().doc('platform/' + platformId));
        return await this.filmRef.doc(film.id).update({
            title: film.title,
            image: film.image,
            subtitle: film.subtitle,
            content: film.content,
            director: firebase.firestore().doc('director/' + film.director),
            platforms: platformRefs
        });
    }
}
