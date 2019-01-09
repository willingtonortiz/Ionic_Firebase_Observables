import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";

// Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from "../enviroment/environment";

// Pages
import { HomePage } from "../pages/home/home";
import { AdministratorUserPage } from "../pages/administrator-user/administrator-user";
import { CommonUserPage } from "../pages/common-user/common-user";

// Providers
import { UserDaoProvider } from "../providers/user-dao/user-dao";

@NgModule({
	declarations: [MyApp, HomePage, AdministratorUserPage, CommonUserPage],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp, HomePage, AdministratorUserPage, CommonUserPage],
	providers: [
		StatusBar,
		SplashScreen,
		UserDaoProvider,
		{ provide: ErrorHandler, useClass: IonicErrorHandler }
	]
})
export class AppModule {}
