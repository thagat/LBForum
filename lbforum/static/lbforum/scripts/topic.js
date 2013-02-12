var Post = function(id){
  this.id = id;

  this.initialize = function(){
    var _this = this;
    $("#vote-" + this.id + "-up-btn").click(function(){
      _this.vote('/vote/up/');
    });

    $("#vote-" + this.id + "-down-btn").click(function(){
      _this.vote('/vote/down/');
    });
  }

  this.vote = function(url){
    var _this;


    _this = this;

    options = {
      type: "POST",
      url: url,
      data: this.id,
      contentType: 'application/json',

      error: function(jqXHR){
      },

      success: function(data){
        console.log(data);
        $("#post-" + _this.id + "-value").html(data);
      },
    };

    $.ajax(options);
  }
}

var Topic = function(id, postIds){
  this.id = id;
  this.posts = [];

  this.initialize = function(){
    $('.entry-attachments-img-s a').click(function() {
        var p = $(this).parent();
        p.hide();
        p.next().show()
        return false;
    })
    $('.post-entry a').attr({ target: "_blank" });

    for(postId in postIds){
      var post = new Post(postId);
      post.initialize();
      this.posts.push(post);
    }
    console.log('topic initialized');
  }
}
