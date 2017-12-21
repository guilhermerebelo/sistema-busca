pesquisa.filter("filtroPesquisa", function(){
	return function(entrada, parametro){
		saida = [];
		for (var i = 0; i < entrada.length; i++){
			if  ( 
					((entrada[i].Venda >= parametro.valorMin ) && (entrada[i].Venda <= parametro.valorMax )) 
					&& 
					((entrada[i].saldoTotal >= parametro.estoqueMin ) && (entrada[i].saldoTotal <= parametro.estoqueMax )) 
				) {
				saida.push(entrada[i]);
			}
		};		
		return saida;		
	};
})