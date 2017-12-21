pesquisa.controller("pesquisaCtrl", function ($scope, conexaoJson) {

	var _imprimirPdf = function _imprimirPdf(){
		var pdf = new jsPDF('l', 'pt', 'a4');
	    // source can be HTML-formatted string, or a reference
	    // to an actual DOM element from which the text will be scraped.
	    source = $('#tabelaImpressao')[0];

	    // we support special element handlers. Register them with jQuery-style 
	    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
	    // There is no support for any other type of selectors 
	    // (class, of compound) at this time.
	    specialElementHandlers = {
	        // element with id of "bypass" - jQuery style selector
	        '#bypassme': function (element, renderer) {
	            // true = "handled elsewhere, bypass text extraction"
	            return true
	        }
	    };
	    margins = {
	        top: 25,
	        bottom: 20,
	        left: 100,
	        width: 700
	    };
	    // all coords and widths are in jsPDF instance's declared units
	    // 'inches' in this case
	    pdf.fromHTML(
		    source, // HTML string or DOM elem ref.
		    margins.left, // x coord
		    margins.top, { // y coord
		        'width': margins.width, // max width of content on PDF
		        'elementHandlers': specialElementHandlers
	    },

	    function (dispose) {
	        // dispose: object with X, Y of the last line add to the PDF 
	        //          this allow the insertion of new lines after html
	        pdf.save('relatorio.pdf');
	    }, margins);
	};

	$scope.pesquisaLista = function(input){
		$scope.pesquisa = {
			produto : input.produto,
			id: input.id,
			valorMin: input.valorMin,
			valorMax: input.valorMax,
			estoqueMin: input.estoqueMin,
			estoqueMax: input.estoqueMax,
			iniciaCom: input.iniciaCom
		}
		// faz com que apareçam os dados após a pesquisa
		$scope.esconderDados = true;

		document.getElementById('btnImprimir').onclick = _imprimirPdf;
		
	}

	$scope.ordenarPesquisa = function(ordem){
		$scope.ordemPesquisa = ordem;
		if ($scope.inverso == null) {
			$scope.inverso = true;	
		} else{
			$scope.inverso = !$scope.inverso;	
		}		
	}

	$scope.impressao = function(input){

		json = {
			produto : input.produto,
			id: input.id,
			valorMin: input.valorMin,
			valorMax: input.valorMax,
			estoqueMin: input.estoqueMin,
			estoqueMax: input.estoqueMax
		};

		localStorage.setItem("dadosPesquisa", JSON.stringify(json));

		window.open("impressao.html");		
	}




    function _CarregarEConverterDadosDaybi(){
    	//DAYBI
		/* set up XMLHttpRequest */
	    var url = "excel/daybi.xlsx";
	    var oReqDaybi = new XMLHttpRequest();
	    oReqDaybi.open("GET", url, true);
	    oReqDaybi.responseType = "arraybuffer";
    	$("#texto-carregando").text("Carregando Daybi..");
	    
	    oReqDaybi.onload = function(e) {
			var arraybuffer = oReqDaybi.response;

			/* convert data to binary string */
			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			/* Call XLSX */
			var workbook = XLSX.read(bstr, {type:"binary"});

			/* DO SOMETHING WITH workbook HERE */
			var first_sheet_name = workbook.SheetNames[0];
			/* Get worksheet */
			var worksheet = workbook.Sheets[first_sheet_name];
			produtosDaybi = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
			teste1 = true;

	    }
	    oReqDaybi.send();

	    var repeticao1 = setInterval(function(){    		
	    	if (teste1 == true){
	    		clearInterval(repeticao1);

	    		//$scope.saida = [];
	    		//$scope.saida = array;
	    		//console.log(produtosDaybi);
	    		console.log(produtosDaybi.length);
	    		console.log(typeof(produtosDaybi));
	    		//window.location.assign("#!/table");
	    		setTimeout(function(){
					_CarregarEConverterDadosEletromix();
	    		},500);
	    	}

	    },1000);
    }

    function _CarregarEConverterDadosEletromix(){
    	//ELETROMIX
	    /* set up XMLHttpRequest */
	    $("#texto-carregando").text("Carregando Eletromix..");
	    var url = "excel/eletromix.xlsx";
	    var oReqEletromix = new XMLHttpRequest();
	    oReqEletromix.open("GET", url, true);
	    oReqEletromix.responseType = "arraybuffer";
	    
	    oReqEletromix.onload = function(e) {
			var arraybuffer = oReqEletromix.response;

			/* convert data to binary string */
			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			/* Call XLSX */
			var workbook = XLSX.read(bstr, {type:"binary"});

			/* DO SOMETHING WITH workbook HERE */
			var first_sheet_name = workbook.SheetNames[0];
			/* Get worksheet */
			var worksheet = workbook.Sheets[first_sheet_name];
			produtosEletromix = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
			teste2 = true;

	    }
	    oReqEletromix.send();

	    var repeticao2 = setInterval(function(){    		
	    	if (teste2 == true){
	    		clearInterval(repeticao2);

	    		//$scope.saida = [];
	    		//$scope.saida = array;
	    		
	    		//console.log(produtosEletromix);
	    		console.log(produtosEletromix.length);
	    		console.log(typeof(produtosEletromix));
	    		//window.location.assign("#!/table");
	    		setTimeout(function(){
	    			
					_CarregarEConverterDadosTecnogame();
	    		},500);
	    	}

	    },1000);
    }

    function _CarregarEConverterDadosTecnogame(){
    	//TECNOGAME
	    /* set up XMLHttpRequest */
	    $("#texto-carregando").text("Carregando Tecnogame..");
	    var url = "excel/tecnogame.xlsx";
	    var oReqTecnogame = new XMLHttpRequest();
	    oReqTecnogame.open("GET", url, true);
	    oReqTecnogame.responseType = "arraybuffer";
	    
	    oReqTecnogame.onload = function(e) {
			var arraybuffer = oReqTecnogame.response;

			/* convert data to binary string */
			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			/* Call XLSX */
			var workbook = XLSX.read(bstr, {type:"binary"});

			/* DO SOMETHING WITH workbook HERE */
			var first_sheet_name = workbook.SheetNames[0];
			/* Get worksheet */
			var worksheet = workbook.Sheets[first_sheet_name];
			produtosTecnogame = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
			teste3 = true;

	    }
	    oReqTecnogame.send();

	    var repeticao3 = setInterval(function(){    		
	    	if (teste3 == true){
	    		clearInterval(repeticao3);

	    		//$scope.saida = [];
	    		//$scope.saida = array;
	    		
	    		//console.log(produtosTecnogame);
	    		console.log(produtosTecnogame.length);
	    		console.log(typeof(produtosTecnogame));
	    		//window.location.assign("#!/table");
	    		setTimeout(function(){
	    			
					_CarregarEConverterDadosEstoque();
	    		},500);

	    	}

	    },1000);
    }

    function _CarregarEConverterDadosEstoque(){
    	//ESTOQUE
	    /* set up XMLHttpRequest */
	    $("#texto-carregando").text("Carregando Estoque..");
	    var url = "excel/estoque.xlsx";
	    var oReqEstoque = new XMLHttpRequest();
	    oReqEstoque.open("GET", url, true);
	    oReqEstoque.responseType = "arraybuffer";
	    
	    oReqEstoque.onload = function(e) {
			var arraybuffer = oReqEstoque.response;

			/* convert data to binary string */
			var data = new Uint8Array(arraybuffer);
			var arr = new Array();
			for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");

			/* Call XLSX */
			var workbook = XLSX.read(bstr, {type:"binary"});

			/* DO SOMETHING WITH workbook HERE */
			var first_sheet_name = workbook.SheetNames[0];
			/* Get worksheet */
			var worksheet = workbook.Sheets[first_sheet_name];
			produtosEstoque = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
			teste4 = true;

	    }
	    oReqEstoque.send();

	    var repeticao4 = setInterval(function(){    		
	    	if (teste4 == true){
	    		clearInterval(repeticao4);

	    		//$scope.saida = [];
	    		//$scope.saida = array;
	    		
	    		//console.log(produtosEstoque);
	    		console.log(produtosEstoque.length);
	    		console.log(typeof(produtosEstoque));
	    		//window.location.assign("#!/table");
	    		setTimeout(function(){
	    			
	    			_juntarArray();
	    		},500);
	    	}

	    },1000);
    }

    function _juntarArray(){
    	//informa o front
    	$("#texto-carregando").text("Finalizando..");

    	// cria um novo json unico
    	const estoqueTotal = produtosDaybi.map((produto, index) => {
		  return Object.assign(produto, {
		    saldoEletro: produtosEletromix[index].Saldo,
		    saldoTecnogame: produtosTecnogame[index].Saldo,
		    saldoEstoque: produtosEstoque[index].Saldo,
		    saldoTotal: produtosEletromix[index].Saldo + produtosTecnogame[index].Saldo + produtosEstoque[index].Saldo + produtosDaybi[index].Saldo
		  }, {});
		});
		
		// passa para view
		$scope.produtos = estoqueTotal;

		console.log(estoqueTotal);
		console.log("Novo objeto criado");


		_maiorValor(estoqueTotal);

		setTimeout(function(){
			// esconde o loading
			$scope.loadingBegin = true;

			//redireciona a página
			window.location.replace("#!/pesquisa");

			// deleta as variaveis para liberar espaço em memoria
			delete produtosDaybi;
			delete produtosEletromix;
			delete produtosTecnogame;
			delete produtosEstoque;			
		},500);
    }


    function _maiorValor(estoqueTotal){
    	maiorValor = 0;
    	maiorEstoque = 0;
    	for (i = 0; i < estoqueTotal.length; i++){
    		if (estoqueTotal[i].Venda > maiorValor) {
    			maiorValor = estoqueTotal[i].Venda;
    		}
    		if (estoqueTotal[i].saldoTotal > maiorEstoque) {
    			maiorEstoque = estoqueTotal[i].saldoTotal;
    		}
    	}
    	
    	$scope.input = {			
			valorMin: 0,
			valorMax: maiorValor,
			estoqueMin: 0,
			estoqueMax: maiorEstoque
		}
		// colocar esse codigo la em cima, afinal os dados ja vao estar no input
		$scope.pesquisa = {			
			valorMin: 0,
			valorMax: maiorValor,
			estoqueMin: 0,
			estoqueMax: maiorEstoque
		}

    }

    //CORRIGIR ESSA FUNÇÃO APOS ESTIVER TUDO FUNCIONANDO - DIMINUIR ESSE CÓDIGO
	_CarregarEConverterDadosDaybi();	

})