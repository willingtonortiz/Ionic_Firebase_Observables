import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { User } from "../../models/user.module";
import { UserDaoProvider } from "../../providers/user-dao/user-dao";

@Component({
	selector: "page-common-user",
	templateUrl: "common-user.html"
})
export class CommonUserPage {
	private user: User = {
		id: "",
		name: "",
		rank: "",
		dni: ""
	};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private userDao: UserDaoProvider
	) {
		this.user = this.navParams.data;
	}

	private editUser(): void {
		this.userDao.updateUser(this.user);
	}
}
