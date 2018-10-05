WEBDOCK.component().register(function(exports){
    var scope;   


    function loadAllUsers(){
        var handler = exports.getComponent("settings-handler");
        handler.transformers.allUsers()
        .then(function(result){
            vueData.data.allUsers = result.result;
        })
        .error(function(error){
            alert (error);
        });
    }

    var vueData = {
        methods:{
            navigate: function(id){
                handler = exports.getShellComponent("soss-routes");
                handler.appNavigate(id ? "/user?userid=" + id : "/user");
            }
        },
        data :{
            allUsers : []
        },
        onReady: function(s){           
            scope = s;
            loadAllUsers();
        }
    }    

    exports.vue = vueData;
    exports.onReady = function(element){
    }
});
