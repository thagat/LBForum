var Post = function(id, voteUpUrl, voteDownUrl){
  this.id = id;
  this.voteUpUrl = voteUpUrl;
  this.voteDownUrl = voteDownUrl;

  this.initialize = function(){
    var _this = this;

    $("#vote-" + this.id + "-up-btn").click(function(){
      _this.vote(_this.voteUpUrl);
    });

    $("#vote-" + this.id + "-down-btn").click(function(){
      _this.vote(_this.voteDownUrl);
    });
  };

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
    // declare the variables
    var i, post, postId;

    $('.entry-attachments-img-s a').click(function() {
        var p = $(this).parent();
        p.hide();
        p.next().show()
        return false;
    })

    $('.post-entry a').attr({ target: "_blank" });

    // initialize the postsn
    for(i in postIds){
      postId = postIds[i];

      post = new Post(postId, this.voteUpUrls[postId], this.voteDownUrls[postId]);

      post.initialize();
      this.posts.push(post);
    }
    console.log('topic initialized');
  }
}
