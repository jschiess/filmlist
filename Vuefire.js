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
		request: '',
		localdb: [],
		firedb: {},
		show: false,
	},
	created: function () {
		fire.once('value', (snap) => {
			this.firedb = snap.val()
			this.createLocalDB()
		})

	},
	methods: {
		getposter: function (filepath) {
			let baseUrl = 'https://image.tmdb.org/t/p/';
			let filesize = 'w500';
			//
			return baseUrl + filesize + filepath;

		},

		// takes an object as prameter reterns the url of the poster

		getimdbObject: function (query, callback) {
			//takes an id and gets the movie of that id from imdb 

			let api_key = '2fb2a73cdabea954fa733209911eea69'
			let urlbody = 'https://api.themoviedb.org/3/search/movie'
			var url = urlbody + '?api_key=' + api_key + '&language=en-US&query=' + query + '&page=1&include_adult=false'


			//let url = urlbody + '/search/movie?api_key=' + api_key + '&language=en-US&query=' + query + '&page=1&include_adult=false'

			$.get(url, function (data, error) {
				//let temp = sdata.results[0];
				//app.$set(app.obj, n , temp)

			}).done(function (data) {
				callback(data)

			})
		},

		createLocalDB: function (f) {

			function geg(query, n, callback) {
				//takes an id and gets the movie of that id from imdb 
				let api_key = '2fb2a73cdabea954fa733209911eea69'
				let urlbody = 'https://api.themoviedb.org/3/movie/'
				var url = urlbody + query + '?api_key=' + api_key
				$.get(url, function (data, error) {

					app.$set(app.localdb, n, data)
				}).done(function (data) {
					//callback(data)
				})

			}

			let temp = {};

			for (f in this.firedb) {

				let kek = this.firedb[f].id

				geg(kek, f, function (data) {

					app.$set(app.localdb, f, data)
				})

			}



		},




		addel: function (a) {
			app.getimdbObject(app.request, function (data) {
				let tempobj = app.firedb
				id = data.results[0].id;


				tempobj.push({
					id: id,
					object: 'filler',
					rating: 'filler'
				})
				this.firedb = tempobj
				fire.set(tempobj)
				app.createLocalDB()

			})

			/*app.getimdbObject(a, function(data){
				id = data
			})*/



		},
		del: function (a, i) {
			var temp = this.firedb;
			console.log(temp);

			for (n in temp) {

				if (temp[n].id == a.id) {
					delete temp[n]

					var lol = []
					for (n in temp) {
						lol.push(temp[n])
					}

				}


			}

			//Vue.delete(this.$data, 'firedb');
			Vue.set(this.$data, 'firedb', lol)

			fire.set(lol)
			this.createLocalDB()

			this.$forceUpdate();
		},
		kek: function(f){
			const height = '500px'
			var condition = $('#'+f).find('.moreinfo');
			console.log(condition.height());
			
			function remove() {
				$('.mel').find('.moreinfo').animate({
					height:'0%',
				}, 500)
				
				$('.mel').find('.spacer').animate({
					margin: '0%'
				},500)
			}
			if(condition.height() == 0) {
				
				remove()

				$('#'+f).children().last(-1).prev().animate({
					height:height,
				}, 500)
				
				$('#'+f).children().last(-1).animate({
					marginBottom: height
				},500)
			} else {
				remove()
				$('#'+f).children().last(-1).prev().animate({
					height:'0%',
				}, 500)
				
				$('#'+f).children().last(-1).animate({
					margin: '0%'
				},500)
			}
		
		}
	}

})



fire.on('value', (snap) => {
	console.log('works');

	this.firedb = snap.val()
	app.createLocalDB()
})
