function hashPass(){
    var shaone = CryptoJS.SHA1(document.getElementsByName("shaone")[1].value);	
    document.passform.shaone.value = shaone.toString().toUpperCase();
    document.passform.submit();
}
