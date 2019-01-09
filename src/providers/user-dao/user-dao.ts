import { Injectable } from "@angular/core";
import {
	AngularFirestore,
	AngularFirestoreCollection,
	DocumentChangeAction
} from "angularfire2/firestore";
import { User } from "../../models/user.module";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UserDaoProvider {
	// Observable que se usará en la aplicación
	private users: Observable<Array<User>>;

	// Collección de objetos desde la cuál se obtendrá el observable
	private collection: AngularFirestoreCollection<User>;

	constructor(private firebase: AngularFirestore) {
		this.collection = this.firebase.collection("Users");
		this.users = this.collection.valueChanges();
	}

	public getUsersObservable(): Observable<Array<User>> {
		return this.users;
	}

	public getUsersWithIdObservable(): Observable<Array<User>> {
		return this.collection.snapshotChanges().pipe(
			map(changes =>
				changes.map(doc => {
					const id = doc.payload.doc.id;
					const data = doc.payload.doc.data() as User;
					return { id, ...data };
				})
			)
		);
	}

	public getUsersPromise(): Promise<Array<User>> {
		return new Promise((resolve, reject) => {
			let subscription: Subscription = this.users.subscribe({
				next: (data: Array<User>) => {
					resolve(data);
					subscription.unsubscribe();
				}
			});
		});
	}

	public getUsersWithIdPromise(): Promise<Array<User>> {
		return new Promise<Array<User>>((resolve, reject) => {
			let subscription: Subscription = this.collection
				.snapshotChanges()
				.pipe(
					map((result: DocumentChangeAction<User>[]) =>
						result.map((doc: DocumentChangeAction<User>) => {
							const id = doc.payload.doc.id;
							const data = doc.payload.doc.data() as User;
							return { id, ...data };
						})
					)
				)
				.subscribe({
					next: (data: Array<User>) => {
						resolve(data);
						subscription.unsubscribe();
					}
				});
		});
	}

	public createUser(item: User): Promise<void> {
		const id: string = this.firebase.createId();

		return this.firebase.doc(`Users/${id}`).set({
			name: item.name,
			dni: item.dni,
			rank: item.rank
		});
	}

	public updateUser(item: User) {
		this.firebase.doc(`Users/${item.id}`).update({
			name: item.name,
			dni: item.dni,
			rank: item.rank
		});
	}

	public deleteUser(userId: string): Promise<void> {
		return this.firebase.doc(`Users/${userId}`).delete();
	}
}
