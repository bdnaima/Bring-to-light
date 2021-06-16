//const addMessage = firebase.functions().httpsCallable('helloWorld');

const sendEmail = async (e) => {
    e.preventDefault()
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    const subject = encodeURIComponent(document.querySelector('#subject').value || 'Consultation');
    let body = ''
    if (firstName) body += `First name: ${firstName}\n`
    if (lastName) body += `Last name: ${lastName}\n`
    if (email) body += `Email: ${email}\n`
    if (message) body += `\n${message}\n`
    body = encodeURIComponent(body)

    window.location.href = `mailto:bringtolightcounselling@gmail.com?subject=${subject}&body=${body}`

    document.querySelector('#firstName').value = '';
    document.querySelector('#lastName').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';
    document.querySelector('#subject').value = ''
}

const bookConsultation = () => {
    window.location.href = `mailto:bringtolightcounselling@gmail.com?subject=Consultation`
}
