//$(document).ready(function () {

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


var myobj = []

fire.once('value', (snap) => {
	app.db = snap.val()
	app.maso()
})





var app = new Vue({
	el: '#app',
	data: {
		request: 'primer',
		img: [],
		db: myobj
	},
	methods: {
		posterp: function (q) {
			let end
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
			*
			* retardef ufkcinf prommis pissn me off
			*/
			$.get(url, function (sdata, serr) {

				let movieID = sdata.results[0].id

				let findurl = 'https://api.themoviedb.org/3/movie/' + movieID + '?api_key=' + api_key + '&language=en-US'
				/*
				* uses the last the first element in the results to do stuff
				* builds the path of the image
				*/
				let baseUrl = 'https://image.tmdb.org/t/p/'
				let filesize = 'w500'
				let filepath = sdata.results[0].poster_path

				/*
				* sets the image path to the vue object 
				*/

				app.img.push(baseUrl + filesize + filepath)

			})

		},
		maso: function () {
			console.log(this.db);

			for (n of this.db) {
				console.log((this.posterp(n.name)))
			}

		},
		getobj: function () {
			return this.db
		},
		addel: function (a) {
			let temp = this.getobj()
			let tempobj = {name: a}
			temp.push(tempobj)

			fire.set(temp)
		}
	}
})



app.addel('primer')



//})










