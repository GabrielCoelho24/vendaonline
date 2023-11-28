if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
  var totalAmount = "0,00"
  
  function ready() {
    // Botão remover produto
    const removeCartProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeCartProductButtons.length; i++) {
      removeCartProductButtons[i].addEventListener("click", removeProduct)
    }
  
    // Mudança valor dos inputs
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }
  
    // Botão add produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart)
    }
  
    // Botão comprar
    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
  }
  
  function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
  }
  
  function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
      event.target.parentElement.parentElement.remove()
    }
  
    updateTotal()
  }
  
  function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productName = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const productsCartNames = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartNames.length; i++) {
      if (productsCartNames[i].innerText === productName) {
        productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
        updateTotal()
        return
      }
    }
  
    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
  
    newCartProduct.innerHTML =
      `
        <td class="product-identification">
          <img src="${productImage}" alt="${productName}" class="cart-product-image">
          <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
          <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
          <input type="number" value="1" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
      `
    
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()
  
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
  }
  
  
  
  // Atualizar o valor total do carrinho
  
  function validarFormulario(event) {
    event.preventDefault(); // Impedir a ação padrão do formulário

    var nome = document.forms["inscricao"]["nome"].value;
    var cpf = document.forms["inscricao"]["cpf"].value;
    var email = document.forms["inscricao"]["email"].value;
    var telefone = document.forms["inscricao"]["telefone"].value;
    var cep = document.forms["inscricao"]["cep"].value;

    // Validar se os campos obrigatórios estão preenchidos
    if (nome === "" || cpf === "" || email === "" || telefone === ""|| cep === "") {
        alert("Todos os campos obrigatórios devem ser preenchidos.");
        return false;
    }

    // Validar o formato do CPF
    var cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf.match(cpfPattern)) {
        alert("O CPF deve estar no formato XXX.XXX.XXX-XX.");
        return false;
    }

    // Validar o formato do email
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailPattern)) {
        alert("O email deve estar em um formato válido.");
        
    }

    var telefonePattern = /[0-9]{2} [0-9]{4}-[0-9]{4} /;
    if (!telefone.match(telefonePattern)){
        alert("o Telefone deve estar no formato XX XXXX-XXXX")
        return false;
    }

    var cepPattern = /[0-9]{5}-[0-9]{3}/;
    if (!cep.match(cepPattern)){
        alert("o Cep deve estar no formato XXXXX-XXX")
        return false;
    }


    // Se todos os campos estiverem corretos, salvar as informações localmente
    salvarInformacoesLocalmente();
}

function salvarInformacoesLocalmente() {
    var nome = document.forms["inscricao"]["nome"].value;
    var cpf = document.forms["inscricao"]["cpf"].value;
    var email = document.forms["inscricao"]["email"].value;
    var telefone = document.forms["inscricao"]["telefone"].value;
    var cep = document.forms["inscricao"]["cep"].value;

    // Salvar as informações localmente (por exemplo, no LocalStorage)
    var inscricao = {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        cep: cep
    };

    // Converter o objeto para uma string JSON
    var inscricaoJSON = JSON.stringify(inscricao);

    // Armazenar os dados localmente
    localStorage.setItem("inscricao", inscricaoJSON);

    // Exibir uma mensagem de inscrição bem-sucedida
    alert("Inscrição efetuada com sucesso");
}

// Verificar se já existe a chave "total_inscritos" no Local Storage
if (localStorage.getItem("total_inscritos") === null) {
    // Se não existir, criar a chave "total_inscritos" com valor inicial 0
    localStorage.setItem("total_inscritos", 0);
}

// Ao efetuar uma nova inscrição, aumentar o valor da chave "total_inscritos" em 1
var totalInscritos = parseInt(localStorage.getItem("total_inscritos"));
totalInscritos = isNaN(totalInscritos) ? 0 : totalInscritos;
totalInscritos++;
localStorage.setItem("total_inscritos", totalInscritos);

// Para recuperar o número total de inscritos:
var numeroTotalInscritos = localStorage.getItem("total_inscritos");

console.log("Número total de inscritos: " + numeroTotalInscritos);


function adicionarCompra(totalAmount) {
  // Obtemos o histórico do localStorage
  var historico = JSON.parse(localStorage.getItem('historico')) || [];

  // Adicionamos a nova compra ao histórico
  historico.push(parseFloat(totalAmount));

  // Atualizamos o localStorage com o novo histórico
  localStorage.setItem('historico', JSON.stringify(historico));
}

// Atualizar o valor total do carrinho
function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product");
  var totalAmount = 0;

  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".");
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value;

    totalAmount += productPrice * productQuantity;
  }

  totalAmount = totalAmount.toFixed(2);
  totalAmount = totalAmount.replace(".", ",");
  document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount;

  // Adicionar a compra ao histórico se totalAmount for maior que 1
  if (parseFloat(totalAmount) > 1) {
    adicionarCompra(totalAmount);
  }
}

// Chamada da função para adicionar uma compra fictícia (substitua pelo valor real)
// Substitua isso pelo valor real da compra
adicionarCompra(totalAmount);

// Chamada da função para exibir o histórico
exibirHistorico();

// Função para obter e exibir o histórico de compras
function exibirHistorico() {
  // Obtemos o histórico do localStorage
  var historico = JSON.parse(localStorage.getItem('historico')) || [];

  // Exibimos o histórico no console
  console.log("Histórico de Compras:", historico);
}