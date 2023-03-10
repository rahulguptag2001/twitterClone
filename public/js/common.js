$("#postTextArea").keyup(event=>{
    let textbox=$(event.target);
    let value=textbox.val().trim();

    let submitButton=$('#submitPostButton');

    if(submitButton.length ==0) return alert('no submit button found');

    if(value==""){
        submitButton.prop("disabled",true);
        return ;
    }

    submitButton.prop("disabled",false); 
})
$("#submitPostButton").click(()=>{  
    let button = $(Event.target);
    let textbox=$('#postTextArea');
    

    let data={
        content: textbox.val(),
    }


    $.post("/api/posts",data, postData =>{

        let html= createPostHtml(postData)
        $(".postsContainer").prepend(html);
        textbox.val("");
        button.prop("disabled",true);
    });

});

function createPostHtml(postData){
 
    let postedBy=postData.postedBy;
    let displayName=postedBy.firstname + " " + postedBy.lastname;
    let timestamp=postData.createdAt;

    return `<div class='post'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                         <img src='${postedBy.profilePic}'>    
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                        <a href='/profile/${postedBy.username}'>${displayName}</a>
                        <span class='username'>@${postedBy.username}</span>
                        <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                        <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>

                        </div>
                    </div>
                </div>
            </div>`;
}