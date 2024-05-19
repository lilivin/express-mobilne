import { Injectable } from '@nestjs/common';
import { firebase } from '../firebaseConfig';
import { getDocs, query } from "firebase/firestore"
import { Category } from './category';

@Injectable()
export class CategoryService {
    categoryRef = firebase.firestore().collection('category');
    filmRef = firebase.firestore().collection('film');

    async findAll() {
        const q = query(this.categoryRef);
        const data = await getDocs(q);
        let categories = [];
        data.docs.map(doc => {
            const category = {
                id: doc.id,
                ...doc.data()
            };
            categories.push(category)
        });
        return categories;
    }


    async find(id: string){
        const q = await this.categoryRef.doc(id).get();
        const category = {
            id,
            ...q.data()
        }
        return category;
    }

    async findFilms(id: string){
        const directorDocRef = this.categoryRef.doc(id);
        const q = this.filmRef.where("category", "==", directorDocRef);
        const data = await getDocs(q);
        let films = [];
        const filmPromises = data.docs.map(async (doc) => {
            const filmData = doc.data();
            return {
                id: doc.id,
                title: filmData.title,
                subtitle: filmData.subtitle,
                image: filmData.image
            }
        });
    
        films = await Promise.all(filmPromises);
        return films;
    }

    async create(category: Category){
        return await this.categoryRef.add({
            name: category.name
        })
    }

    async delete(id: string){
        return this.categoryRef.doc(id).delete();
    }

    async put(category: Category){
        return await this.categoryRef.doc(category.id).update({
            name: category.name,
        });
    }
}
