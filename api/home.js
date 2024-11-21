import {
	Get,
	Post
} from '../http/requst.js';
import toPromise from '../http/toPromise.js';
let Home = {
	 _15: function() {
		const opts = {
			url: "15",
		}
		return toPromise(Get(opts)).then(res => res)
			.catch();
	}, 
	_17: function() {
		
		const opts = {
			url: "17",
		}
		return toPromise(Get(opts)).then(res => res)
			.catch();
	},
 //   _17: function(data) {
	// 	return toPromise(Post({
	// 		url: `basic-farm/page`,
	// 		data: data,
	// 		paramConfig: 'smc'
	// 	})).then((res) => {
	// 		return res;
	// 	})
	// },
}


export default Home;