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

		draw_grid();
	})
})

function draw_grid() {
	let image_width = parseInt(image.get("width") * image.get("scaleX"), 10);
	let image_height = parseInt(image.get("height") * image.get("scaleY"), 10);

	let tile_width = image_width / 16;
	let tile_height = image_height / 10;

	for (var x = 0; x < image_width; x += tile_width) {
		let coords = [x + 10, 10, x + 10, image_height + 10]
		let line = new fabric.Line(coords, {
			fill: "red",
			stroke: "red",
			strokeWidth: 2,
		})

		canvas.add(line)
	}

	for (var y = 0; y < image_height; y += tile_height) {
		let coords = [10, y + 10, image_width + 10, y + 10]
		let line = new fabric.Line(coords, {
			fill: "red",
			stroke: "red",
			strokeWidth: 2,
		})

		canvas.add(line)	
	}

	console.log(image_width, image_height)
}