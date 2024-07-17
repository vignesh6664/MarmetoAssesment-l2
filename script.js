let data;

fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => response.json())
  .then((json) => {
    data = json;
    displayCategory("Men");
  })
  .catch((error) => console.error("Error fetching data:", error));


const btn1 = document.querySelector('#btn-1');
const btn2 = document.querySelector('#btn-2');
const btn3 = document.querySelector('#btn-3');

btn1.addEventListener('click', (e) => {
  e.target.classList.add('transparent-button');
  btn2.classList.remove('transparent-button');
  btn3.classList.remove('transparent-button');
});

btn2.addEventListener('click', (e) => {
  e.target.classList.add('transparent-button');
  btn1.classList.remove('transparent-button');
  btn3.classList.remove('transparent-button');
});


btn3.addEventListener('click', (e) => {
  e.target.classList.add('transparent-button');
  btn2.classList.remove('transparent-button');
  btn1.classList.remove('transparent-button');
});



function displayCategory(categoryName) {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  function calculateDiscount(price, compareAtPrice) {
    if (!price || !compareAtPrice) return 0;
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return discount.toFixed(0);
  }

  const category = data.categories.find(
    (cat) => cat.category_name === categoryName
  );
  if (category) {
    category.category_products.forEach((product) => {
      const discount = calculateDiscount(
        product.price,
        product.compare_at_price
      );
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      const productImageCard = document.createElement("div");
      productImageCard.classList.add('product-image-card');

      if (product.badge_text) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = product.badge_text;
        productImageCard.appendChild(badge);
      }
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImageCard.appendChild(productImage);

      productCard.appendChild(productImageCard);


      const nameContainer = document.createElement('div');
      nameContainer.classList.add('name-container');


      const productTitle = document.createElement("h2");
      productTitle.textContent = product.title;
      nameContainer.appendChild(productTitle);
      
      const productVendor = document.createElement("li");
      productVendor.textContent = `${product.vendor}`;
      nameContainer.appendChild(productVendor);

      productCard.appendChild(nameContainer);


      const priceContainer = document.createElement('div');
      priceContainer.classList.add('price-container');



      const productPrice = document.createElement("p");
      productPrice.className = "price-product";
      productPrice.textContent = `Rs: ${product.price}`;
      priceContainer.appendChild(productPrice);

      const compareAtPrice = document.createElement("s");
      compareAtPrice.className = "comparePrice";
      compareAtPrice.textContent = `${product.compare_at_price}`;
      priceContainer.appendChild(compareAtPrice);

      const Discount = document.createElement("p");
      Discount.className = "discount";
      Discount.textContent = `${discount} %off`;
      priceContainer.appendChild(Discount);

      productCard.appendChild(priceContainer);

      const AddToCart = document.createElement("button");
      AddToCart.textContent = "Add To Cart";
      productCard.appendChild(AddToCart);
      productsContainer.appendChild(productCard);
    });
  }
}
