WEBDOCK.component().register(function(exports){
    var scope;
    var handler;
    var pInstance, validatorInstance;
    var routeData;

    
    var bindData = {
        product:{},
        uoms:[],
        content:"",
        submitErrors:[],
        p_image:[],
        currentImage:""
    };

    var vueData =   {
        methods: {
            navigateBack: function(){
                handler1 = exports.getShellComponent("soss-routes");
                handler1.appNavigate("..");
            },
            showModal: function(url){
                bindData.currentImage = url;
                $("#image-gallery").modal();
            }
        },
        data : bindData,
        onReady : function(s){
            scope = s;
            handler = exports.getComponent("cms-gapp-handler");
            pInstance = exports.getShellComponent("soss-routes");
            routeData = pInstance.getInputData();
            ///loadValidator();
            if (routeData)
                loadCategory(scope);
            else{
                //bindData.product={title="Artical was not found",content:"ssssss"};
            }
           
        },
        computed: {
          compiledMarkdown: function () {
            
            return marked(bindData.product.content);
          }
        }
    }

    function loadCategory(scope){
        if (routeData.id){
            var menuhandler  = exports.getShellComponent("soss-data");
            var query=[{storename:"d_cms_artical_v1",search:"id:"+routeData.id},
            {storename:"d_cms_artical_imagev1",search:"articalid:"+routeData.id}];
            //var tmpmenu=[];
            bindData.TopButtons=[];
            menuhandler.services.q(query)
                        .then(function(r){
                            console.log(JSON.stringify(r));
                            if(r.success){
                                if(r.result.d_cms_artical_v1.length!=0)
                                bindData.product= r.result.d_cms_artical_v1[0];
                                document.title = unescape(bindData.product.title);

                                bindData.product.content=bindData.product.content.split("~^").join("'");
                                bindData.product.content=bindData.product.content.split('~*').join('"');
                                bindData.product.title=unescape(bindData.product.title);
                                bindData.product.content=unescape(bindData.product.content);
                                bindData.product.summery=unescape(bindData.product.summery);
                                bindData.product.tags=unescape(bindData.product.tags);
                                bindData.p_image =  r.result.d_cms_artical_imagev1;
                                for (var i = 0; i < bindData.p_image.length; i++) {
                                    bindData.p_image[i].scr='components/dock/soss-uploader/service/get/d_cms_artical/'+bindData.product.id+'-'+bindData.p_image[i].name;
                                }

                            }
                        })
                        .error(function(error){
                            bindData.product={title:"Artical Not found or Internal query Erorr",content:"Please refresh or navigate back"};
                            console.log(error.responseJSON);
            });
            
        }
    }

    

    


    exports.vue = vueData;
    exports.onReady = function(element){
        
    }
});
