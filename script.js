function addToCart(productName, price) {
    // Verifica se há itens no localStorage
    var cartItems = localStorage.getItem('cartItems');
    cartItems = cartItems ? JSON.parse(cartItems) : [];

    // Adiciona o novo item ao carrinho
    var newItem = {
        productName: productName,
        price: price
    };

    cartItems.push(newItem);

    // Atualiza o localStorage com os itens atualizados do carrinho
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}

function updateCartDisplay() {
    var cartTable = document.getElementById('cartTable');
    var cartItems = localStorage.getItem('cartItems');

    // Limpa a tabela do carrinho
    cartTable.innerHTML = '<tr><th>Produto</th><th>Preço</th></tr>';

    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        // Adiciona cada item do carrinho à tabela
        cartItems.forEach(function (item) {
            var row = cartTable.insertRow(-1);
            var productNameCell = row.insertCell(0);
            var priceCell = row.insertCell(1);

            productNameCell.textContent = item.productName;
            priceCell.textContent = 'R$ ' + item.price.toFixed(2);
        });
    }
}

// Atualiza a exibição do carrinho quando a página é carregada
window.onload = function () {
    updateCartDisplay();
};