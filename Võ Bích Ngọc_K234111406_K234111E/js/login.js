function process_login() {
            let uid = document.myform.user_name.value.trim();
            let pwd = document.myform.user_password.value.trim();
            let errorBox = document.getElementById("error-box");
            const correctUser = "ngocvb";
            const correctPass = "vobichngoc142@";
            
            if (uid === correctUser && pwd === correctPass) {
                errorBox.classList.remove("show");
                localStorage.setItem("login_infor", JSON.stringify({ 
                    user: uid, 
                    password: pwd 
                }));
                localStorage.setItem("save_infor", document.myform.save_info.checked);
                localStorage.setItem("isLoggedIn", "true");
                showLogoutPage();
            } else {
                errorBox.classList.add("show");
            }
        }

        function process_logout() {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("login_infor");
            showLoginPage();
        }

        function showLoginPage() {
    document.getElementById("login-page").classList.remove("hidden");
    document.getElementById("logout-page").classList.add("hidden");
    load_login_infor();
}

function showLogoutPage() {
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("logout-page").classList.remove("hidden");

    let loginInfo = JSON.parse(localStorage.getItem("login_infor"));
    document.getElementById("welcome-message").textContent =
        "Xin chào, " + (loginInfo?.user || "Người dùng") + "!";
}

        function load_login_infor() {
            let json_string = localStorage.getItem("login_infor");
            if (!json_string) return;
            
            let json_object = JSON.parse(json_string);
            let save = localStorage.getItem("save_infor");
            
            if (save === 'true') {
                document.myform.user_name.value = json_object.user;
                document.myform.user_password.value = json_object.password;
                document.myform.save_info.checked = true;
            }
        }

        function checkLoginStatus() {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                showLogoutPage();
            } else {
                showLoginPage();
            }
        }

        window.onload = function() {
            checkLoginStatus();
        };