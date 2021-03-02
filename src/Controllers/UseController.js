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
            let spanEmail = document.getElementById("msgemail");
            let spanPhone = document.getElementById("msgphone")
            spanEmail.innerHTML = " "
            spanPhone.innerHTML = " "
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
        document.getElementById("msgemail").innerHTML="E-mail válido";
        alert("E-mail valido")
        } else {
        document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
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
            element.value = setText
        } else {
            document.getElementById("msgphone").innerHTML="<font color='red'>Número inválido</font>";
            alert("Número de telefone invalido")
        }
    }

    setValidation(element) {
        let dataUser = element.value

        if(dataUser.indexOf("@") > -1) {
            this.validationEmail(element)
        } else {
            this.validationPhone(element)
        }   
    }

    generalValidation(element) {
        switch (element.type) {
            case "text":
                this.setValidation(element)
                break
            case "password": 
                console.log(element.value)
                break
            default:
                console.log("Valores não identificados")
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
