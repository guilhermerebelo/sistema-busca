pesquisa.filter("filtroPesquisaEstoque", function(){
	return function(entrada, parametro){
		saida = [];
		for (var i = 0; i < entrada.length; i++){
			if  ((entrada[i].Venda >= parametro.estoqueMin ) && (entrada[i].Venda <= parametro.estoqueMax )) {
				saida.push(entrada[i]);
			}
		};
		console.log("saida");
		console.log(saida);
		return saida;
		
	};
})