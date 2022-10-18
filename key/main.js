const keygen = length => {
  let result = ''
    , characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charactersLength = characters.length;

  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

document.getElementById("generate").addEventListener("click", function() {
  (async () => {
    const { value: password } = await Swal.fire({
      icon: 'question',
      title: 'Verification',
      text: 'Complete this verification check to verify that you are Avner',
      input: 'password',
      confirmButtonText:'Verify',
      inputPlaceholder: 'Enter the secret password',
    })
    
    if (password === 'avner') {
      localStorage.setItem('bs-key', keygen(7))
      $( "#key" ).val(localStorage.getItem('bs-key'))
    } else {
      $( "#key" ).val(`Incorrect password!`)
    }
  })()
});