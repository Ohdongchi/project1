const form = document.querySelector('#register_form');
form.addEventListener('submit', (e) => {
    var id = document.querySelector('#id');
    var password = document.querySelector('#password');
    var password_check = document.querySelector('#password_check');
    var name = document.querySelector('#name');
    if (id.value == "") {
        e.preventDefault()
        alert("ID를 입력해주세요.");
        id.focus();
        return false;
    } else if (password.value == "") {
        e.preventDefault()
        alert("Password를 입력해주세요.");
        pass.focus();
        return false;
    } else if (password_check.value == "") {
        e.preventDefault()
        alert("Password를 재확인 해주세요.");
        pass.focus();
        return false;
    } else if (name.value == "") {
        e.preventDefault()
        alert("name를 입력해주세요.");
        pass.focus();
        return false;
    } else {
        if (password.value == password_check.value) {
            return true;
        } else {
            e.preventDefault()
            alert("비밀번호와 비밀번호 재확인이 맞지 않습니다 !!");
        }
    }
});

function menuButtonClick(x) {
    x.classList.toggle("change");
}