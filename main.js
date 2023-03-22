const basketAmount = document.querySelector(".basket-amount");
const basketClearBtn = document.querySelector(".basket-clear-btn");
const currentProducts = products;
const mainContainer = document.querySelector(".container");

let basketBtns;
let basket = [];

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
	document
		.querySelectorAll(".product-add-to-basket-btn")
		.forEach((btn) => btn.addEventListener("click", addToBasket));
	return renderedProducts;
};

const renderCategories = (products) => {
	const categories = [];
	products.forEach((product) => {
		return categories.push(product.category);
	});
	const setCategories = new Set(categories);
	const allCategories = ["Wszystkie", ...setCategories];
	const categoriesUpperFirst = allCategories.map((word) => {
		const capitalizedWord = word.charAt(0).toUpperCase();
		const rest = word.slice(1).toLowerCase();
		return capitalizedWord + rest;
	});
	return categoriesUpperFirst;
};

const createCategories = (kategory) => {
	const categorySection = document.querySelector(".categories-items");
	for (let i = 0; i < kategory.length; i++) {
		const categoryBtn = document.createElement("button");
		categoryBtn.textContent = kategory[i];
		categorySection.append(categoryBtn);
	}
	document
		.querySelector(".categories-items button:first-child")
		.classList.add("active");
	return categorySection;
};

createCategories(renderCategories(currentProducts));

const activeCategoriesButtons = function () {
	categoriesButtons.forEach((btn) => btn.classList.remove("active"));
	this.classList.add("active");
};

const categoriesButtons = [
	...document.querySelectorAll(".categories-items button"),
];
categoriesButtons.forEach((btn) =>
	btn.addEventListener("click", activeCategoriesButtons)
);

const category = renderCategories(currentProducts);

document
	.querySelector(".categories-items")
	.addEventListener("click", (event) => {
		let categoryBtn = event.target.textContent;
		if (event.target.tagName === "BUTTON") {
			const categoryItems = currentProducts.filter((item) => {
				if (categoryBtn.toLowerCase() === item.category) return item;
			});
			if (categoryBtn.toLowerCase() === "wszystkie") {
				return renderProduct(currentProducts);
			}

			return renderProduct(categoryItems);
		}
	});

document.querySelector(".search-bar-input").addEventListener("input", (e) => {
	let query = e.target.value;
	const elemets = currentProducts.filter((element) =>
		element.category.toLowerCase().includes(query)
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
	basketClearBtn.classList.add("active");
};

const clearBasket = () => {
	basket = [];
	basketAmount.textContent = "Koszyk";
	basketClearBtn.classList.remove("active");
};
basketClearBtn.addEventListener("click", clearBasket);

renderProduct(currentProducts);
