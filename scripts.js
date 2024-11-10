document.addEventListener('DOMContentLoaded', function () {
    const botoes = document.querySelectorAll('.adicionaraocarrinho');
    const numeroWhatsapp = '244912345678'; // Insira o número do WhatsApp da loja aqui
    const carrinhoElement = document.getElementById('produtos-carrinho');
    const finalizarCompraBtn = document.getElementById('finalizar-compra');
    let carrinho = [];

    // Função para atualizar a exibição do carrinho
    function atualizarCarrinho() {
        carrinhoElement.innerHTML = '';
        if (carrinho.length > 0) {
            carrinho.forEach((produto, index) => {
                carrinhoElement.innerHTML += `
                    <div>
                        <strong>${produto.nome}</strong> - ${produto.quantidade} unidades - ${produto.preco} Kzs
                        <button onclick="removerDoCarrinho(${index})">Remover Item</button>
                    </div>`;
            });
            finalizarCompraBtn.style.display = 'block';
        } else {
            carrinhoElement.innerHTML = '<p>Ups! Seu carrinho está vazio.</p>';
            finalizarCompraBtn.style.display = 'none';
        }
    }

    // Função para remover item do carrinho
    window.removerDoCarrinho = function (index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    // Adicionar produtos ao carrinho
    botoes.forEach(function (botao) {
        botao.addEventListener('click', function () {
            const nomeProduto = this.getAttribute('data-nome');
            const precoProduto = this.getAttribute('data-preco');
            const quantidadeProduto = this.getAttribute('data-quantidade');

            // Adicionar produto ao carrinho
            carrinho.push({
                nome: nomeProduto,
                preco: precoProduto,
                quantidade: quantidadeProduto
            });

            // Atualizar visual do carrinho
            atualizarCarrinho();
        });
    });

    // Finalizar compra e redirecionar para o WhatsApp
    finalizarCompraBtn.addEventListener('click', function () {
        let mensagem = 'Olá, gostaria de finalizar a compra com os seguintes itens:\n\n';

        carrinho.forEach(produto => {
            mensagem += `${produto.nome} - ${produto.quantidade} unidades - ${produto.preco} Kzs\n`;
        });

        const url = `https://wa.me/${922773689}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
});

