document.querySelectorAll('.post_delete').forEach(function (tag) {
    tag.addEventListener('click',function(){
        var login = document.querySelector('.My_id');
        if (login){
            var PosterId = document.querySelector('.poster_id').value;
            var UserId = document.querySelector('.poster_user_id').value;
            var MyId = login.value;
            alert(PosterId+ "  " + UserId + "  " + MyId);
            if(UserId == MyId){
                if(confirm('글을 삭제 하시겠습니까 ? ')){
                    var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                              location.reload();
                            } else {
                                console.error(xhr.responseText);
                            }
                        };
                        xhr.open('POST', '/board/delete/' + PosterId);
                        xhr.send();
                }
            }
        }
    });
});
document.querySelectorAll('.post_update').forEach(function (tag) {
    tag.addEventListener('click',function(){
        var login = document.querySelector('.My_id');
        if (login){
            var PosterId = document.querySelector('.poster_id').value;
            var UserId = document.querySelector('.poster_user_id').value;
            var MyId = login.value;
            if(UserId == MyId){
                if(confirm('글을 수정 하시겠습니까 ? ')){
                    var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                              location.reload();
                            } else {
                                console.error(xhr.responseText);
                            }
                        };
                        xhr.open('POST', '/board/update/' + PosterId);
                        xhr.send();
                }
            }
        }
    });
});