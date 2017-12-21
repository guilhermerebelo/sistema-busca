pesquisa.filter("filtroNome", function(){
	return function(input, parametro){
		if (parametro.NomeProduto.produto != null) {
			output = [];
			novoNome = "";
			if (parametro.NomeProduto.iniciaCom) {
				for(i = 0; i < input.length; i++){
					//repeticao = parametro.NomeProduto.produto.length / 2 ;
					for (a = 0; a < parametro.NomeProduto.produto.length ; a++){
						novoNome = novoNome.concat(input[i].NomeProduto[a]);
					};
					produto = parametro.NomeProduto.produto.toUpperCase();			
					if (novoNome == produto) {
						output.push(input[i]);
					};
					novoNome = "";
				};
			} else{
				return input;
			}
			return output;			
		} else{
			return input;
		}
	};
	
})