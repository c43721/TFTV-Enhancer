function set_indicator(val) {
	const indicator = document.getElementById("indicator");
	if (val == 1) {
		indicator.className = 'text-center green-text';
		indicator.innerHTML = 'Enabled';
	}
	else {
		indicator.className = 'text-center red-text';
		indicator.innerHTML = 'Disabled';
	}
}

function set_dropmenu(val) {
	const menu = document.getElementById("enb_drop");

	if (val == 1) {
		menu.innerHTML = '<option value="1" selected>ENABLED</option><option value="0">DISABLED</option>';

	}
	else {
		menu.innerHTML = '<option value="1">ENABLED</option><option value="0" selected>DISABLED</option>';
	}


}

function setDrop(val) {
	const options = document.getElementById("selector_blocked");
	document.getElementById("blocker");
	if (val == 1) {
		options.innerHTML = `<option value="1" selected>Euros</option> <option value="2">Americans</option> <option value="3">Rainbow</option>`;
		blocker.innerHTML = `Euro`;
	} else if (val == 2) {
		options.innerHTML = `<option value="1" >Euros</option> <option value="2" selected>Americans</option> <option value="3">Rainbow</option>`;
		blocker.innerHTML = `American`;
	} else {
		options.innerHTML = `<option value="1" >Euros</option> <option value="2">Americans</option> <option value="3" selected>Rainbow</option>`;
		blocker.innerHTML = `Rainbow`;
	}
}

//Auto-executes this function on load.
(() => {
	document.getElementById("container").addEventListener("change", () => {
		const main = document.getElementById("enb_drop").value;
		const post_block = document.getElementById("selector_blocked").value;
		chrome.storage.sync.set({ 'enabled': main, 'option': post_block }, () => { });

		set_indicator(main);
		set_dropmenu(main);
		setDrop(post_block);
	});

	//Check to see if the extension is enabled or disabled, and set the 
	//elements on the popup accordingly.
	chrome.storage.sync.get(["enabled", "option"], val => {
		set_indicator(val["enabled"]);
		set_dropmenu(val["enabled"]);
		setDrop(val.option)
	});
})();