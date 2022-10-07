$(function(){
    // formatando numeros
    function formatarPreco(precoAtual){
        precoAtual = precoAtual.toFixed(2);
        precoArr = precoAtual.split('.');

        var novoPreco = formatarTotal(pracoArr);

        return novoPreco;
    }

    function formatarTotal(precoArr){
        if(precoArr[0] < 1000){
            return precoArr[0]+','+precoArr[1];
        }else if(precoArr[0] < 10000){
            return precoArr[0][0]+'.'+precoArr[0].substr(1,precoArr[0].length)+','+precoArr[1];
        }else{
            return precoArr[0][0]+'.'+precoArr[0][1].substr(2,precoArr[0].length)+','+precoArr[1];
        }

    }

    /*
        sistema de slide da página idividual dos carros 
    */

    var maxIndex = Math.ceil($('.mini-img-wraper').length/3) - 1;
    var curIndex = 0;

    initSlider();
    navigateSlider();
    clickSlider();

    function initSlider(){
        var amt = $('.mini-img-wraper').length * 33.3;
        var elScroll = $('.nav-galeria-wraper');
        var elSingle = $('.mini-img-wraper');

        elScroll.css('width',amt+'%');
        elSingle.css('width',33.3*(100/amt)+'%');
    }

    function navigateSlider(){
        $('.arrow-right-nav').click(function(){
            if (curIndex < maxIndex){
                curIndex++;
                var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }
        });

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0){
                curIndex--;
                var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
                $('.nav-galeria').animate({'scrollLeft':elOff+'px'});
            }
        });
    }

    function clickSlider(){
        $('.mini-img-wraper').click(function(){
            $('.mini-img-wraper').css('background-color','transparent');
            $(this).css('background-color','rgb(210,210,210)');
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image',img);
        });

        $('.mini-img-wraper').eq(0).click();
    }

    $('.mobile, .menu-mobile').click(function(){
        $(this).find('ul').slideToggle();
    })
    
    var directory = 'http://127.0.0.1:5500/index.html';

    /*
        Validando formulario
    */

    $('input[type=text').focus(function(){
        resetarCampoInvalido($(this));
    })

    $('#form1').submit(function(e){

        e.preventDefault();
        var nome = $('input[name=nome]').val();
        var email = $('input[name=email]').val();
        var telefone = $('input[name=telefone]').val();

        if(verificarNome(nome) == false){
            aplicarCampoInvalido($('input[name=nome]'));
        }
        else if(verificarTelefone(telefone) == false){
            aplicarCampoInvalido($('input[name=telefone]'));
        }
        else if(verificarEmail(email) == false){
            aplicarCampoInvalido($('input[name=email]'));
        }
    });

    function verificarNome(nome){
        var splitStr = nome.split(' ');
        var amount = splitStr.length;

        if(nome == '')
            return false;

        if(splitStr.length >=2){
            for (var i = 0; i < amount; i++){
                if(splitStr[i].match(/[a-z]/)){
                    
                }
                else{
                    aplicarCampoInvalido($('input[name=nome]'));
                    return false;
                }
            }
        }
        else{
            aplicarCampoInvalido($('input[name=nome]'));            
            return false;
        }
    }

    function verificarTelefone(telefone){
        if (telefone == '')
            return false;

        telefone.trim();

        if(telefone.length == 11){
            if(telefone.includes(' ') == false){
                if(telefone.match(/^[0-9]/) != null){

                }
                else{
                    aplicarCampoInvalido($('input[name=telefone]'));
                    return false;
                }
            }
            else{
                aplicarCampoInvalido($('input[name=telefone]'));
                return false;
            }
        }
        else{
            aplicarCampoInvalido($('input[name=telefone]'));
            return false;
        }
    }

    function verificarEmail(email){
        if(email == ''){
            return false;
        }
        else{
            
        }
        let emailArray = email.split('@');
        let str1 = emailArray[0];
        let str2 = emailArray[1];

        if(str2 != null){
            if(str2.valueOf().includes('.com') == true || str2.valueOf().includes('.com.br') == true && str1.match(/^[a-z0-9]/)){
                console.log(emailArray[0],emailArray[1]);
            }
            else{
                aplicarCampoInvalido($('input[name=email]'));
            }
        }
        else{
            aplicarCampoInvalido($('input[name=email]'));
        }
    }

   
    function aplicarCampoInvalido(el){
        el.css('color', 'red');
        el.css('border','1px solid red');
        el.val('CAMPO INVÁLIDO!');
    }
     
    function resetarCampoInvalido(el){
        el.css('color', 'black');
        el.css('border','1px solid #ccc');
        el.val('');
    }



    

});