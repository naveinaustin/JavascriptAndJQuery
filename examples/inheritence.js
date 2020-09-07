//Create a BaseService that gets a Token
function BaseService () {
	 BaseService.prototype.getToken = function() {
   		return $.ajax({
      	type: 'GET',
        url: 'https://demo3493513.mockable.io/token'
      });
   };
   
   /*
    callApi will first call getToken and then make the next API call
    This is using jQuery.Deferred()
   */
   BaseService.prototype.callApi = function(ajaxParams) {
  		 var dfd = jQuery.Deferred();
   		 this.getToken()
      	.done(function(data) {
        	console.log("callApi SUCCESS " + data);
          console.log(ajaxParams);
     		  $.ajax(ajaxParams)
          	.done(function(data) {
            	console.log("inner done " + data)
          		dfd.resolve(data);
          	})
            .fail(function(jqXHR, textStatus, errorThrown) {
            	console.log("inner fail " + data)
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
          		dfd.reject(jqXHR, textStatus, errorThrown);
            });
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
  				console.log("callApi failure");
 	 				console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          dfd.reject(jqXHR, textStatus, errorThrown);
  			});
   		 return dfd.promise();
   };
   
   /*
    callApi2 is similar to callApi but uses functions passed as 
    parameters which get called.
   */
   BaseService.prototype.callApi2 = function(ajaxParams, done, fail) {
  		 this.getToken()
      	.done(function(data) {
        	console.log("callApi SUCCESS " + data);
          console.log(ajaxParams);
     		  $.ajax(ajaxParams)
          	.done(done)
            .fail(fail);
        })
        .fail(fail);
   };
};

var ajaxParams = {
  type: 'POST',
  url: 'https://demo3493513.mockable.io/students',
  dataType: 'json',
  data: {}
}

//var baseService = new BaseService();
baseService.callApi(ajaxParams)
	.done(function(data) {
  	console.log("------success");
  	console.log(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
  console.log("-----fail");
  console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
 	 //console.log(data);
  });
  
  function done2(data) {
  	console.log("------success2");
  	console.log(data);
  }
  
  function fail2(jqXHR, textStatus, errorThrown) {
    console.log("-----fail2");
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  }
  
baseService.callApi2(ajaxParams, done2, fail2)

//Service1 is a Sub Class.
function Service1 () {
  /*
  	If you dont invoke the below line then you need to explicitly
  	make a call like var baseService = new BaseService();
    as seen at line 58
  */
  BaseService.call(this);
	Service1.prototype.getData = function() {
  	console.log("service1 getDAta");
    var ajaxParams = {
      type: 'POST',
      url: 'https://demo3493513.mockable.io/students',
      dataType: 'json',
      data: {}
    };
    function done2(data) {
      console.log("------success2");
      console.log(data);
    }

    function fail2(jqXHR, textStatus, errorThrown) {
       console.log("-----fail2");
       console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }  
    
    //this.callApi2(ajaxParams, done2, fail2);
    this.callApi(ajaxParams)
      .done(function(data) {
        console.log("------success");
        console.log(data);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("-----fail");
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
    
  };
};

//This is the code to implement inheritence
Service1.prototype = Object.create(BaseService.prototype);

var service1 = new Service1();
service1.getData();
