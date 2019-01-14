$(document).ready(x=>{
    console.log('Jquery Cargado');
    $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: 1200,
        pager:false,
      });

    $('#formulario').submit((x,i)=>{
        var datos={
            nombres:$('input[name="nombres"]').val(),
            apellidos:$('input[name="apellidos"]').val(),
            direccion:$('input[name="direccion"]').val(),
            correo:$('input[name="correo"]').val(),
            fecharegistro:$('input[name="fechareg"]').val(),
            pais:$('select[name="pais"]').val(),
        }

        debugger;
        
       
        
        //localStorage.setItem('datos',JSON.stringify(datos));
         
        var valores=function(name,key,value){
            var exist=localStorage.getItem(name);
            exist= exist? JSON.parse(exist) : [];
            exist.push(value);
            localStorage.setItem(name,JSON.stringify(exist));
        }

        valores('datos','data1',datos);
        
        
       
    })  

        var data=JSON.parse(localStorage.getItem('datos'));
        if(data !=null || data !=undefined){
            data.forEach(x => {
                /*$('#list tbody ').append("<td>"+x.nombres+"</td>")
                $('#list tbody ').append("<td>"+x.apellidos+"</td>")
                $('#list tbody ').append("<td>"+x.direccion+"</td>")
                $('#list tbody ').append("<td>"+x.correo+"</td>")
                $('#list tbody ').append("<td>"+x.fecharegistro+"</td>")
                $('#list tbody ').append("<br/>")*/
               var cuerpo= `
                <tr>
                    <td>${x.nombres}</td>
                    <td>${x.apellidos}</td>
                    <td>${x.direccion}</td>
                    <td>${x.correo}</td>
                    <td>${x.fecharegistro}</td>
                    <td>${x.pais}</td>
                </tr>`
                $('#list tbody ').append(cuerpo);
                $('#list').DataTable();
            });
        }else{
            
        }
        

    $.get('https://reqres.in/api/users',data=>{
        data.data.forEach(element => {
            $('#pais').append("<option>"+element.first_name+"</option>")
         });

         console.log(data)
    })     

    $('#pais').selectmenu({
        select: function(event,ui){
            
            $.get('https://reqres.in/api/users',datas=>{
              
            var filtro=datas.data.filter(x=>x.first_name==ui.item.value);
            filtro.forEach(valor=>{
                $('#provincia').append("<option>"+valor.last_name+"</option>")
            })
       
             })  
        }
    })
        
})