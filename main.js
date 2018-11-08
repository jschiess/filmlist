var config = {
	apiKey: "AIzaSyDnHUH6Ye4NP4eacQIJEz035GU2izj7Abk",
	authDomain: "filmlist-7f806.firebaseapp.com",
	databaseURL: "https://filmlist-7f806.firebaseio.com",
	projectId: "filmlist-7f806",
	storageBucket: "filmlist-7f806.appspot.com",
	messagingSenderId: "852162697399"
};
firebase.initializeApp(config);

const fire = firebase.database().ref().child('/')


var app = new Vue({
	el: '#app',
	data: {
		request: 'fill',
		obj: [],
		db: []
	},
	created: function () {
		



		fire.once('value', (snap) => {
			app.db = snap.val()
			app.maso()

		})
	},
	methods: {
		getposter: function (a) {
			let baseUrl = 'https://image.tmdb.org/t/p/'
			let filesize = 'w500'
			let filepath = a
			return baseUrl + filesize + filepath
		},
		posterp: function (q, n) {

			/* 
			 * GET request prerequisits
			 * to search the moviedb
			 * gets multiple resulte and uses the first one
			 */


			let query = q

			let api_key = '2fb2a73cdabea954fa733209911eea69'
			let urlbody = 'https://api.themoviedb.org/3'
			let url = urlbody + '/search/movie?api_key=' + api_key + '&language=en-US&query=' + query + '&page=1&include_adult=false'

			/* 
			 * GET request to moviedb
			 */

			$.get(url, function (sdata, serr) {
				/*
				 * uses the last the first element in the results to do stuff
				 * builds the path of the image
				 */

				/*
				 * sets the image path to the vue object 
				 */

				let temp = sdata.results[0]
				app.$set(app.obj, n , temp)
			})
		},
		maso: function () {

			for (n in this.db) {
				console.log(this.db);
				console.log(n);
				
				
				this.posterp(this.db[n].name, n)
			}

		},
		getobj: function () {
			return this.db
		},
		addel: function (a) {
			var tempobj = this.getobj()
			console.log(tempobj);
			
			tempobj.push({
				name: a
			})


			fire.set(tempobj)

			fire.once('value', (snap) => {
				this.db = snap.val()
				app.maso()
			})


		},
		test: function () {

		},
		del: function (a, i) {
			let temp = this.db

			//delete temp[i];
			this.$delete(this.obj, i);
			this.$delete(this.db, i);

			fire.set(this.db)

			fire.once('value', (snap) => {
				this.db = snap.val()
				app.maso()
			})
		}
	}
	
})

fire.once('value', (snap) => {
	this.db = snap.val()
	app.maso()
})
