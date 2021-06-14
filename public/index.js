const addMessage = firebase.functions().httpsCallable('helloWorld');

const sendEmail = async () => {
    const res = await addMessage({ text: "Noma" })
    console.log(res)
}
