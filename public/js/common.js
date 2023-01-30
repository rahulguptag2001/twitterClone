$("postTextArea").keyup((event)=>{
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
$('#submitPostButton').click(()=>{
    let button=$(event.target);
    let textbox=$('#postTextArea');
    

    let data={
        content: textbox.val(),
    }
    $.post("/api/posts",data,(postData,status,xhr)=>{
        console.log(postData);
    });

})