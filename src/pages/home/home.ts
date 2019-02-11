import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserDaoProvider } from "../../providers/user-dao/user-dao";
import { User } from "../../models/user.module";
import { Subscription, Observable } from "rxjs";
import { AdministratorUserPage } from "../administrator-user/administrator-user";
import { CommonUserPage } from "../common-user/common-user";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	private usersObservable: Observable<Array<User>>;

	constructor(
		public navCtrl: NavController,
		private userDao: UserDaoProvider
	) {
		this.usersObservable = this.userDao.getUsersWithIdObservable();
		this.usersObservable.subscribe({
			next: (data: Array<User>) => {
				data.forEach((user) => { console.log(user) })
			}
		});


		let arr: number[] = [1, 2, 3, 4];

		let otroArreglo = arr.map((data) => { return "hola" });
		console.log(arr);
		console.log(otroArreglo);
	}

	ngOnDestroy(): void { }

	private userAccess(user: User): void {
		if (user.rank === "Administrador") {
			this.navCtrl.push(AdministratorUserPage, user);
		} else {
			this.navCtrl.push(CommonUserPage, user);
		}
	}
}
