// /js/products.js

/**
 * Loads products dynamically from products.json
 * and renders them as Bootstrap cards.
 */

document.addEventListener("DOMContentLoaded", () => {
	fetch("/data/products.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to load products.json");
			}
			return response.json();
		})
		.then((products) => renderProducts(products))
		.catch((error) => handleError(error));
});

/**
 * Renders product cards dynamically.
 * @param {Array} products - Array of product objects from products.json
 */
function renderProducts(products) {
	const container = document.getElementById("product-list");
	if (!container) return;

	products.forEach((product) => {
		const col = document.createElement("div");
		col.className = "col-sm-10 col-md-6 col-lg-4";

		col.innerHTML = `
			<div class="card">
				<div class="card-img-wrapper">
					<img
						src="${product.image}"
						loading="lazy"
						class="card-img-top"
						alt="${product.alt}" />
				</div>
				<div class="card-body">
					<h5 class="card-title">${product.title}</h5>
					<p class="card-text">${product.description}</p>
					<a href="${product.link}" class="btn btn-primary">Learn More</a>
				</div>
			</div>
		`;

		container.appendChild(col);
	});
}

/**
 * Handles fetch or render errors gracefully.
 */
function handleError(error) {
	console.error(error);
	const container = document.getElementById("product-list");
	if (container) {
		container.innerHTML =
			'<p class="text-danger text-center">Failed to load products.</p>';
	}
}
