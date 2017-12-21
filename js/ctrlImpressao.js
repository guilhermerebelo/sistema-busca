pesquisa.controller("ctrlImpressao", function ($scope, conexaoJson) {	

	//QUEBRA A LINHA, CRIAR UM FILTRO QUE RETORNA UMA TAG PRA ARRUMAR O LEYOUT
	//ng-bind-html & ng-repeat

	function _carregaJson(){
		conexaoJson.getAll().then(function(response){
			$scope.produtos = response.data;
		})
	}

	$scope.ordenarPesquisa = function(ordem){
		$scope.ordemPesquisa = ordem;
		if ($scope.inverso == null) {
			$scope.inverso = true;	
		} else{
			$scope.inverso = !$scope.inverso;	
		}		
	}

	function _gerarDadosImpressao(){	
		local = localStorage.getItem("dadosPesquisa");
		var local = JSON.parse(local);
		$scope.local = local;
		console.log($scope.local);
		_carregaJson();
	}

	_gerarDadosImpressao();
})