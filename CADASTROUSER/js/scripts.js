class Validator {
    constructor() {
      this.validations = [
        'data-required',
        'data-min-length',
        'data-max-length',
        'data-email-validate',
        'data-only-letters',
        'data-equal',
        'data-password-validate',

      ]  
    }

    // iniciar a validações antigas
    validate(form) {

        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // pegar todos inputs
        let inputs = form.getElementsByTagName('input');
        // transformar uma HTMLCollection - > arrey
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
         
            // loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica ser a validação atual existe no imput
                if(input.getAttribute(this.validations[i]) != null) {
                 
                // limpando a string para virar um método
                let method = this.validations[i].replace('data-', '').replace('-', '');

                // valor do input
                let value = input.getAttribute(this.validations[i]);

                // invocar o método
                this[method](input,value);

                }
            }   
            

        }, this);
        
    }


    // verifica se um input tem um número minimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage =  `O campo precisa ter pelo menos ${minValue} caracteres`;
        
        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
        
    }
    // verifique se um input passou do limite de caracteres 
    maxlength(input, maxValue) {

        let inputLength = input.value.length;

        let errorMessage =  `O campo precisa ter menos ${maxValue} caracteres`;
        
        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }

        
    }
    // validar emails
    emailvalidate(input) {

        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão exemplo: tsgo27@hotmail.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }

    }

    // validar se o campo tem apenas letras
    onlyletters(input) {

        let re = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiaias`;

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }


    }
    

    /// método para imprimir msg de errro na tela
    printMessage(input, msg) {

        // verificar quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
      }

    }

    // verifique se o input é requerido
    required(input) {

        let inputValue = input.value;

        if(inputValue === '') {
        let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);

        }


    }

    // verificar se dois campos senha são iguais

    equal(input, inputName) {

        let  inputToCompare = document.getElementsByName(inputName) [0];

        let errorMessage = `Este campo precisa ser igual ao ${inputName}`;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }


    }

    // valida campo senha 

    passwordvalidate(input) {

        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;
    
        for(let i = 0; charArr.length > i; i++) {
          if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
            uppercases++;
          } else if(!isNaN(parseInt(charArr[i]))) {
            numbers++;
          }
        }
    
        if(uppercases === 0 || numbers === 0) {
          let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
    
          this.printMessage(input, errorMessage);
        }
    
      }


    // limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function(e) {
    e.preventDefault();

    validator.validate(form);

});
