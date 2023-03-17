const searchInput = document.querySelector(".search-bar-input");

const basketBtn = document.querySelector(".basket-clear-btn");

const basketAmount = document.querySelector(".basket-amount");

const currentProducts = products;

let basketBtns;
let basket = [];

const renderCategories = function () {
	const categories = currentProducts
		.map((item) => item.category.split())
		.flat();
	for (let i = 0; i < categories.length; i++) {
		categories[i] =
			categories[i].charAt(0).toUpperCase() + categories[i].slice(1);
	}
	const setCategories = new Set(categories);
	const allCategories = ["Wszystkie", ...setCategories];

	const htmlCategories = document.querySelector(".categories-items");

	allCategories.forEach((item) => {
		const newCategory = document.createElement("button");
		newCategory.dataset.key = item;
		newCategory.textContent = item;
		htmlCategories.appendChild(newCategory);
	});
	document
		.querySelector(".categories-items button:first-child")
		.classList.add("active");
};

renderCategories();

basketBtns = document.querySelector(".product-item");
console.log(basketBtns);

const categoriesButtons = document.querySelectorAll(".categories-items button");

const filterCategory = function () {
	const category = this.dataset.key.toLowerCase();
	const categoryItems = currentProducts.filter((item) => {
		if (item.category === category) return item;
	});

	renderProduct(categoryItems);

	if (category === "wszystkie") {
		renderProduct(currentProducts);
	}

	categoriesButtons.forEach((item) => item.classList.remove("active"));
	this.classList.add("active");
};

categoriesButtons.forEach((button) =>
	button.addEventListener("click", filterCategory)
);

searchInput.addEventListener("input", (e) => {
	const text = e.target.value.toLowerCase();
	let elemets = currentProducts.filter((element) =>
		element.category.toLowerCase().includes(text)
	);
	if (elemets.length === 0) {
		document.querySelector(".empty-state").style.display = "block";
	} else {
		document.querySelector(".empty-state").style.display = "none";
	}
	renderProduct(elemets);
});

const addToBasket = (e) => {
	const itemId = Number(e.target.dataset.id);
	const productId = currentProducts.findIndex(
		(element) => element.id === itemId
	);
	basket.push(currentProducts.at(productId));

	const basketTotal = basket.reduce((sum, product) => {
		return sum + product.price - (product.saleAmount ? product.saleAmount : 0);
	}, 0);

	basketAmount.innerHTML = `${basketTotal.toFixed(2)} zł`;
	basketBtn.classList.add("active");
};

const clearBasket = () => {
	basket = [];
	basketAmount.textContent = "Koszyk";
	basketBtn.classList.remove("active");
};

basketBtn.addEventListener("click", clearBasket);

const renderProductHtml = function (item) {
	const productCard = document.createElement("div");
	productCard.innerHTML = `<div class="product-item ${
		item.sale ? "on-sale" : ""
	}">
<img src="${item.image}" alt="Phone">
<p class="product-name">${item.name}</p>
<p class="product-description">${item.description}
</p>
<div class="product-price">
<span class="price">${item.price.toFixed(2)}</span>
<span class="price-sale">${(item.saleAmount
		? item.price - item.saleAmount
		: item.price
	).toFixed(2)}</span>
</div>
<button data-id="${
		item.id
	}" class="product-add-to-basket-btn">Dodaj do koszyka</button>
<p class="product-item-sale-info">Promocja</p>
</div>`;
	return productCard;
};

const renderProduct = function (products) {
	const productSection = document.querySelector(".products");
	productSection.innerHTML = "";
	const renderedProducts = products.forEach((product) => {
		productSection.appendChild(renderProductHtml(product));
	});
	return renderedProducts;
};

renderProduct(currentProducts);
