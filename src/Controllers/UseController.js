class UserController {
    constructor(formId) {
        this.form = document.getElementById(formId)
        this.onSubmit()
        this.onClickClean()
    }

    onSubmit() {
      this.form.addEventListener('submit', (e) => {
          e.preventDefault()
          this.getValues()
      })
    }

    onClickClean() {
        this.form.addEventListener('click', () => {
            let spanEmail = document.getElementById("msgemail")
            let spanPhone = document.getElementById("msgphone")
            let spanPassword = document.getElementById("msgpassword")
            let spanNone = document.getElementById("none")

            spanEmail.innerHTML = " "
            spanPhone.innerHTML = " "
            spanPassword.innerHTML = " "
            spanNone.innerHTML = " "
        })
    }

    cleanUserInput() {
        [...this.form.elements].forEach((element) => {
            
            if(element.type == "text") {
                console.log(element)
            }
        })
    }

    message(user) {
        console.log(user)
    }

    validationEmail(element) {
        let usuario = element.value.substring(0,element.value.indexOf("@"))
        let dominio = element.value.substring(element.value.indexOf("@")+ 1,element.value.length)
            
        if ((usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            alert("E-mail valido")
            return element.value
        } else {
            let inputText = document.getElementById("id_userLogin")
            inputText.classList.add("error")
            
            let spanEmail = document.getElementById("msgemail")
            spanEmail.classList.add("error-text")
            spanEmail.innerHTML = "E-mail inválido"

            alert("E-mail invalido")
        }
    }

    removeHyphen(element) {
        const userPhone = element.value
        const setPhone = userPhone.replace(/\-/g, '')

        return element.value = setPhone
    }

    validationPhone(element) {
        const currentText = this.removeHyphen(element)
        let regex = /[a-zA-Z]/g

        if(!regex.test(currentText)) {
            const isCelular = currentText.length === 9
            let setText
    
            if(isCelular) {
                const part1 = currentText.slice(0,5)
                const part2 = currentText.slice(5,9)
                setText = `${part1}-${part2}` 
            } else {
                const part1 = currentText.slice(0,4)
                const part2 = currentText.slice(4,8)
                setText = `${part1}-${part2}`
            }

            return element.value = setText
        } else {
            let inputText = document.getElementById("id_userLogin")
            inputText.classList.add("error")

            let spanPhone = document.getElementById("msgphone")
            spanPhone.classList.add("error-text")
            spanPhone.innerHTML = "Número inválido"
            
            alert("Número de telefone invalido")
        }
    }

    validationPassword(element) {
        let dataUser = element.value
        if(dataUser.length < 4 || dataUser.length > 60) {
            let spanPassword = document.getElementById("msgpassword")
            spanPassword.classList.add("error-text")
            spanPassword.innerHTML = "A senha deve ter entre 4 e 60 caracteres."
        } else {
            return dataUser
        }
    }

    setValidation(element) {
        let dataUser = element.value
        let regex = /[0-9]/g

        if(dataUser.indexOf("@") > -1) {
            this.validationEmail(element)
        } else if(regex.test(dataUser)) {
            this.validationPhone(element)
        } else {
            let spanNone = document.getElementById("none")
            spanNone.classList.add("error-text")
            spanNone.innerHTML = "Informe um email ou número de telefone válido."
        }
    }

    generalValidation(element) {
        switch (element.type) {
            case "text":
                this.setValidation(element)
                break
            case "password": 
                this.validationPassword(element)
                break
            default:
                console.log("Valores não verificados")
        }   
    }
       
    getValues() {
        let user = {};

        [...this.form.elements].forEach((element) => {
            
            this.generalValidation(element)

            if(element.name) {
                user[element.name] = element.value
            }
        })

        let object = new User(user.userLogin, user.password)

        this.message(object)
    }
}
