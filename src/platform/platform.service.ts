import { Injectable } from '@nestjs/common';
import { firebase } from '../firebaseConfig';
import { getDocs, query } from "firebase/firestore"
import { Platform } from './platform';

@Injectable()
export class PlatformService {
    platformRef = firebase.firestore().collection('platform');
    filmRef = firebase.firestore().collection('film');

    async findAll() {
        const q = query(this.platformRef);
        const data = await getDocs(q);
        let platforms = [];
        data.docs.map(doc => {
            const platform = {
                id: doc.id,
                ...doc.data()
            };
            platforms.push(platform)
        });
        return platforms;
    }


    async find(id: string){
        const q = await this.platformRef.doc(id).get();
        const platform = {
            id,
            ...q.data()
        }
        return platform;
    }

    async findFilms(id: string){
        const platformDocRef = this.platformRef.doc(id);
        const q = this.filmRef.where("platform", "array-contains", platformDocRef);
        const data = await getDocs(q);
        console.log(data.docs)
        const films = data.docs.map((doc) => {
            const filmData = doc.data();
            console.log(filmData)
            return {
                id: doc.id,
                title: filmData.title
            };
        });

        return films;
    }

    async create(platform: Platform){
        return await this.platformRef.add({
            name: platform.name,
        })
    }

    async delete(id: string){
        return this.platformRef.doc(id).delete();
    }

    async put(platform: Platform){
        return await this.platformRef.doc(platform.id).update({
            name: platform.name
        });
    }
}
