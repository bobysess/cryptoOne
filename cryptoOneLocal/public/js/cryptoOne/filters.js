var filtersModule = angular.module('filtersModule', []);

filtersModule.filter('menbershipsFilter', function(){
	 return function(menberships, sharedDocs){
	 			console.log("hellwo Filter !");
	 			var results=[]; 
	 			menberships.foreach(function(menbership){
	 				var isIncluded= false ;
	 					for(var i=0; i< sharedDocs.length;i++){
	 						if(sharedDocs[i].group.id == menbership.group.id){
	 							isIncluded=true;
	 						}
	 					}
	 				if(!isIncluded){
	 					results.push(menbership);
	 				}
	 			});
	 			return results;
			}
})
