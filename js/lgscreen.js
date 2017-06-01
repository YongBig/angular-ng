/**
 * Created by Administrator on 2017/5/3.
 */
//查找用户信息
var storage = window.localStorage;
function queryUser() {
    //设置用户账号拍密码
    if (storage['username'] && storage['password']) {
        $('#username').val(storage['username']);
        $('#password').val(storage['password']);
        $('#rem').prop('checked', 'true')
    }
}
queryUser();
//登陆事件
$('#login').click(function () {
    //错误提示隐藏
    $('#message').removeClass('in');
    //如果密码小于6位提示错误信息
    if ($('#password').val().length < 6) {
        $('#message').html('宝贝密码小于6位');
        $('#message').addClass('in');
        return
    };
    // 请求ajax
    $.ajax({
        url: 'data/test.json',
        type: 'post',
        data: $("#form").serialize(),
        success: function (data) {
            //密码验证正确与否
            if (data.code == 0) {
                $('#message').html('您输入的账号或密码不正确，请重新输入');
                $('#message').addClass('in');
                return
            }
            //获取记住密码
            var isrm = $('#rem').prop('checked');
            console.log(isrm);
            if (data.code == 1 && isrm) {
                storage.setItem("username", $('#username').val());
                storage.setItem("password", $('#password').val());
            }
            //如果不记住密码
            if (!isrm) {
                //清除密码记录
                storage.clear();
            }
            //跳转页面
            //window.location.href='地址'
        }
    })
});