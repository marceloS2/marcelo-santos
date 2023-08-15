class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        const metodosDePagamentoValidos = ['debito', 'credito', 'dinheiro'];

        if (!metodosDePagamentoValidos.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        const carrinho = {};
        let total = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            if (!carrinho[codigo]) {
                carrinho[codigo] = 0;
            }

            carrinho[codigo] += parseInt(quantidade);

            if (codigo !== 'chantily' && codigo !== 'queijo') {
                total += this.cardapio[codigo].valor * parseInt(quantidade);
            }
        }

        if (!carrinho['cafe'] && carrinho['chantily']) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (carrinho['queijo'] && !carrinho['sanduiche']) {
            return "Item extra não pode ser pedido sem o principal";
        }

        total = Object.keys(carrinho).reduce((acc, codigo) => {
            return acc + this.cardapio[codigo].valor * carrinho[codigo];
        }, 0);

        if (Object.keys(carrinho).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (total === 0) {
            return "Quantidade inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            total -= total * 0.05;
        } else if (metodoDePagamento === 'credito') {
            total += total * 0.03;
        }
        
        return "R$ " + total.toFixed(2).replace(".", ",");
    }
}
  
  export default CaixaDaLanchonete;
  