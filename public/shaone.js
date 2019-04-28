function hashPass(){
    var shaone = CryptoJS.SHA1(document.passform.shaone.value);	
    document.passform.shaone.value = shaone.toString().toUpperCase();
    return true;
}
