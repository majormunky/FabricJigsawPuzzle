async function get(url, options) {
	let response = await fetch(url, {
		method: "GET"
	});
	let result;
	if (options.return_type == "json") {
		result = response.json();	
	}


	return result;
}

let get_button = document.getElementById("get-picture-button");
let canvas = null;
let image = null;

document.addEventListener("DOMContentLoaded", () => {
	canvas = new fabric.Canvas("fabric-canvas");
});

get_button.addEventListener("click", (event) => {
	let url = document.getElementById("picture-url-input").value;

	fabric.Image.fromURL(url, (img) => {
		img.scaleToWidth(1260)
		let height = img.get("height") * img.get("scaleY")

		canvas.setHeight(height + 20)
		
		canvas.add(img);
		img.set("left", 10);
		img.set("top", 10);
		img.set("selectable", false)

		image = img;

		puzzlefy();
	})
})

function puzzlefy() {
	let image_width = parseInt(image.get("width") * image.get("scaleX"), 10);
	let image_height = parseInt(image.get("height") * image.get("scaleY"), 10);
	let tile_width = image_width / 8;
	let tile_height = image_height / 5;

	for (var x = 0; x < image_width; x += tile_width) {
		for (var y = 0; y < image_height; y += tile_height) {
			// let coords = [10, y + 10, image_width + 10, y + 10]
			let puzzle_piece = image.cloneAsImage((img) => {
				let rx = Math.floor(Math.random() * 1280);
				let ry = Math.floor(Math.random() * 720);
				let random_rotation = Math.floor(Math.random() * 360);
				img.set("left", rx)
				img.set("top", ry)
				img.rotate(random_rotation)
				canvas.add(img)
			}, {
				left: x + 10,
				top: y + 10,
				width: tile_width,
				height: tile_height
			})
		}
	}

	canvas.remove(image)

	console.log(image_width, image_height)
}