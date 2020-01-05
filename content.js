//After getting and splitting the class names for the post div,
//this is the index of the country flag.
const flag_index = 1;

//All flags that get blocked. Also included UN
const EURO_BLOCKED =
	[
		"flag-gb", "flag-at", "flag-pl", "flag-dk",
		"flag-un", "flag-se", "flag-be", "flag-fr",
		"flag-en", "flag-fi", "flag-eu", "flag-nl",
		"flag-cz", "flag-de"
	]

const AMER_BLOCKED = [
	"flag-us",
]

const RAIN_BLOCKED = [
	"flag-rb",
]

chrome.storage.sync.get(["enabled", "option"], (val) => {
	remove_posts(val.enabled, val.option);
});

async function remove_posts(enabled, option) {
	if (enabled == 1) {
		let query_option;

		if (option == 1) query_option = EURO_BLOCKED;
		else if (option == 2) query_option = AMER_BLOCKED;
		else if (option == 3) query_option = RAIN_BLOCKED;
		else return console.log("No selection. Returning...");

		const thread_container = document.getElementById("thread-container");
		if (thread_container) {
			const post_array = thread_container.getElementsByClassName("post");

			let remove_posts = [];
			let posts_blocked = 0;

			for (let post of post_array) {
				let flag = post.querySelector(".post-header .flag").className.split(" ")[flag_index];

				if (query_option.includes(flag)) {
					remove_posts.push(post);
					posts_blocked++;
				}

				//people selector
				let peopleCheck = post.querySelector(".post-header .post-author").getAttribute("href").slice(6);
				if (peopleCheck === "griff" || peopleCheck === "Getawhale") {
					remove_posts.push(post);
					posts_blocked++;
				}
			}

			while (remove_posts.length > 0) {
				try {
					let post = remove_posts.shift();
					post.parentNode.removeChild(post);
				} catch {
					console.log("Error.. Accessing too many at once.")
				}	
			}

			if (posts_blocked > 0) {
				console.log(`TFTVE: Blocked ${posts_blocked} posts.`);
			}
		}
	}
}