pesquisa.factory("conexaoJson", function ($http) {
	var url = "json/produtos.json";

	function _getAll(){
		return $http.get(url);
	}

	return{
		getAll: _getAll
	}
})