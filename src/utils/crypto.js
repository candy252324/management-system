import CryptoJS from 'crypto-js'

function getAesString(data,key,iv){
  var key  = CryptoJS.enc.Utf8.parse(key);
  //alert(key）;
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var encrypted =CryptoJS.AES.encrypt(data,key,
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}
function getDAesString(encrypted,key,iv){
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
export function encrypt(data){
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var encrypted =getAesString(data,key,iv); //密文
  //var encrypted1 =CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

export function decrypt(data){
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  var iv   = '1234567812345678';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}
