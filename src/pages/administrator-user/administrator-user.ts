import { Component, OnDestroy } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { User } from "../../models/user.module";
import { UserDaoProvider } from "../../providers/user-dao/user-dao";
import { Subscription } from "rxjs";

@Component({
	selector: "page-administrator-user",
	templateUrl: "administrator-user.html"
})
export class AdministratorUserPage implements OnDestroy {
	private user: User = {
		id: "",
		name: "",
		rank: "",
		dni: ""
	};

	private subscription: Subscription;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private userDao: UserDaoProvider
	) {
		this.subscription = userDao.getUsersWithIdObservable().subscribe({
			next: (data: Array<User>) => {
				// console.log("Mostrando usuarios");
				// data.forEach(item => console.log(item));
			}
		});
	}

	ionViewDidLoad() { }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private showUsers(): void { }

	private addUser(): void {
		this.userDao.createUser(this.user);
	}

	private editUser(): void {
		this.userDao.updateUser(this.user);
	}

	private deleteUser(): void {
		this.userDao.deleteUser(this.user.id);
	}
}
