app.controller("kelolaPesertaUjian", function($rootScope, $scope, $http, $location, ujian, $timeout){
	$scope.id_ujian = ujian.getIdUjian();
	$scope.showLoading = function(x){
		if(x == true) $rootScope.loading = 'display:block;';
		else $rootScope.loading = 'display:none;';
	};
	$scope.showLoading(false);
	$scope.pesan = false;
	$scope.showPesan= function(tipe,isi){
		if(tipe == 'Warning') $scope.tipePesan = 'w3-panel w3-red';
		else $scope.tipePesan = 'w3-panel w3-green';
		$scope.isiPesan = isi;
		$scope.pesan = true;
		var pesanTimer = $timeout(function () {
	        $scope.closePesan();
	        $timeout.cancel(pesanTimer);
	    }, 5000);
	};
	$scope.closePesan = function(){
		$scope.pesan = false;
		$scope.isiPesan = '';
	};
	$scope.createForm = false;
	$scope.showForm = function(x){
		if(x == 0) {
			$scope.form = "display:none;";
			}
		else{
			$scope.getPeserta($scope.id_ujian);
			$scope.form = "display:block;";
		}
	}
	$scope.getPeserta = function(id){
		$http.get($rootScope.serverBackEnd+'/api/peserta/not/'+id)
		.then(function(res){
			$scope.peserta = res.data.data;
		})
		.catch(function(e){
			$scope.showPesan('Warning',e);
		})
		.finally(function(){
			
		})
	};
	$scope.readData = function(){
		$scope.showLoading(true);
		$http.get($rootScope.serverBackEnd+'/api/ujian/'+$scope.id_ujian+'/peserta')
		.then(function(res){
			$scope.data = res.data.data;
		})
		.catch(function(e){
			$scope.showPesan('Warning',e);
		})
		.finally(function(){
			$scope.showLoading(false);
		})
		};
	$scope.deleteData = function(id){
		$http.post($rootScope.serverBackEnd+'/api/ujian/'+$scope.id_ujian+'/peserta/delete',JSON.stringify({id_peserta_ujian : id}))
		.then(function(res){
			$scope.result = res.data.status;
			if($scope.result == true){
				$scope.showPesan('Success','Data berhsil dihapus ...');
				$scope.readData();
			}
			else {
				$scope.showPesan('Success','Data gagal dihapus ...');
				$scope.readData();
			}
		})
		.catch(function(e){
			$scope.showPesan('Warning',e);
		})
		.finally(function(){
			
		})
		};
	$scope.createData = function(id){
		var data = {
			id_peserta : id
		};
		data = JSON.stringify(data);
		console.log(data);
		$http({
			method : 'POST',
			url : $rootScope.serverBackEnd+'/api/ujian/'+$scope.id_ujian+'/peserta/create',
			data : data,
			contentType : 'application/json; charset=utf-8'
			})
			.then(function(res){
				$scope.showForm(0);
				$scope.readData();
				$scope.showPesan('Success','Data berhasil ditambahkan');
			})
			.catch(function(e){
				$scope.showPesan('Warning',e);
			})
			.finally(function(){
			
			})
		};
		$scope.detailData = function(id){
		$http.get($rootScope.serverBackEnd+'/api/ujian/'+$scope.id_ujian+'/peserta/'+id)
			.then(function(res){
				var hasil = res.data.data[0];
				$scope.id = hasil.id_ujian;
				$scope.UTnm_ujian = hasil.nm_ujian;
				$scope.showUpdateForm();
			})
			.catch(function(e){
				$scope.showPesan('Warning',e);
			})
			.finally(function(){
			
			})
		}
if($scope.id_ujian == "") $location.path('/');
	else $scope.readData();
});
