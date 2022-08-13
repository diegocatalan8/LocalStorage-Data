import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';


function App() {
  
  const [usuario , setUsuario] = useState({campo:"", valido:null});
  const [password , setPassword] = useState({campo:"", valido:null});
  const [email , setEmail] = useState({campo:"", valido:null});


  //Expresiones regulares
  const expresiones = {

    ExUsuario: /^[a-zA-ZÀ-ÿ\s]{7,12}$/, // Letras y espacios, pueden llevar acentos.
    ExEmail: /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,25})$/, // Para validar correo.
    ExPassword: /^[a-zA-ZÀ-ÿ\s]{3,7}$/ // Letras y espacios, pueden llevar acentos.
  }

  //Destructuramos las expresiones regulares
  const {ExUsuario, ExEmail, ExPassword} = expresiones;


////////////////////////////////////////////////////////////////////////////////////////
  //Funciones onChange para los inputs
   const onChangeUsuario = (e) => {
    
    setUsuario({campo: e.target.value, valido: null});    
  }
  const onChangePassword = (e) => {
      setPassword({campo: e.target.value, valido: null});
  }
  const onChangeEmail = (e) => {
      setEmail({campo: e.target.value, valido: null});
  }
////////////////////////////////////////////////////////////////////////////////////////
 //Validacion para las expresiones regulares
 const validacionUsuario = (e)=>{
  if(ExUsuario){
      if(usuario.campo == ""){
          setUsuario({campo: e.target.value, valido:null});
      }
      
      else if(ExUsuario.test(usuario.campo)){
          setUsuario({campo: e.target.value, valido:true});    
      }
      else{
          setUsuario({campo: e.target.value, valido:false}); 
      }
  }
}

const validacionEmail = (e)=>{
  if(ExEmail){
      if(email.campo == ""){
          setEmail({campo: e.target.value, valido:null});
      }
      
      else if(ExEmail.test(email.campo)){
          setEmail({campo: e.target.value, valido:true});    
      }
      else{
          setEmail({campo: e.target.value, valido:false}); 
      }
  }
}

const validacionPassword = (e)=>{
  if(ExPassword){
      if(password.campo == ""){
          setPassword({campo: e.target.value, valido:null});
      }
      
      else if(ExPassword.test(password.campo)){
        setPassword({campo: e.target.value, valido:true});    
      }
      else{
        setPassword({campo: e.target.value, valido:false}); 
      }
  }
}
////////////////////////////////////////////////////////////////////////////////////////
//Estado para las clases
////////////////////////////////////////////////////////////////////////////////////////

//Clase para el input de nombre de email
var inputClaseEmail; //Variable que sera la clase para el campo input de usuario, cambiara de verde a rojo.
var errorFieldEmail; //variable que sera la clase que muestre el mensaje de error.

if(email.valido == true){
  inputClaseEmail = "inputVerde";
  errorFieldEmail = "none";
}
else if(email.valido == false ){
  inputClaseEmail = "inputRojo";
  errorFieldEmail = "mensajeRojo";
}
else if(email.valido == null ){
  inputClaseEmail = "";
  errorFieldEmail = "none";
}

//Clase para el input de usuario
var inputClaseUsuario; //Variable que sera la clase para el campo input de email, cambiara de verde a rojo.
var errorFieldUsuario; //variable que sera la clase que muestre el mensaje de error.

if(usuario.valido == true){
    inputClaseUsuario = "inputVerde";
    errorFieldUsuario = "none";
}
else if(usuario.valido == false){
    inputClaseUsuario = "inputRojo";
    errorFieldUsuario = "mensajeRojo";
}
else if(usuario.valido == null ){
    inputClaseUsuario = "";
    errorFieldUsuario = "none";
}
//Clase para el input de password
var inputClasePassword; //Variable que sera la clase para el campo input de password, cambiara de verde a rojo.
var errorFieldPassword; //variable que sera la clase que muestre el mensaje de error.

if(password.valido == true){
    inputClasePassword = "inputVerde";
    errorFieldPassword = "none";
}
else if(password.valido == false){
    inputClasePassword = "inputRojo";
    errorFieldPassword = "mensajeRojo";
}
else if(password.valido == null ){
    inputClasePassword = "";
    errorFieldPassword = "none";
}






//////////////////////////////////////////////
//Guardar los datos del usuario en localStorage
//Con Comentarios Guardamos 
var usuarios = JSON.parse(localStorage.getItem("usuarios")) ;
    
    

//Si comentarios es null, lo inicializamos como array vacio y lo metemos en el localStorage
if(usuarios === null || usuarios === undefined || usuarios.length === 0){
    usuarios = [];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}



function guardar(){
    let nombre = document.getElementById("usuario-form").value;
    let email = document.getElementById("email-form").value;
    let password = document.getElementById("password-form").value;

   let form = {
        nombre: nombre,
        email: email,
        password: password
    };

    usuarios.push(form);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}



  return (
    <div className="App">
    <section className="section-comentario">

    <h2>Registrar Alumno</h2>
        <form>
          
            <label>Usuario:</label>
            <input 
            id="usuario-form" 
            type="text" 
            placeholder="  p. ej.: diegocatalan"
            value={usuario.campo}
            onChange={onChangeUsuario}
            onKeyUp={validacionUsuario}
            onBlur={validacionUsuario}
            maxlength="12"
            className={inputClaseUsuario}
            />
            <p className={errorFieldUsuario}><small>El usuario tiene que tener almenos 7 letras.</small></p>
            
            
            <label>Email:</label>
            <input 
            id="email-form" 
            type="text" 
            placeholder="  p. ej.: diegocatalan@gmail.com"
            value={email.campo}
            onChange={onChangeEmail}
            onKeyUp={validacionEmail}
            onBlur={validacionEmail}
            maxlength="25"
            className={inputClaseEmail}

            />
            <p className={errorFieldEmail}><small>Correo no valido.</small></p>


            <label>Password:</label>
            <input 
            id="password-form" 
            type="password" 
            placeholder="  Password"
            value={password.campo}
            onChange={onChangePassword}
            onKeyUp={validacionPassword}
            onBlur={validacionPassword}
            maxlength="7"
            className={inputClasePassword}
            />
            <p className={errorFieldPassword}><small>El password debe de tener 3 letras.</small></p>


          <div className='botones'>
            <button id='btn-borrar'  type="submit" 
            onClick={()=> {
              setUsuario({campo: "", valido:null});
              setEmail({campo: "", valido:null});
              setPassword({campo: "", valido:null});

            }}>Borrar</button>





          
                  <button id='btn-enviar'  type="submit" 
                  
                  onClick={()=>{ 
                    if(usuario.valido == true && email.valido == true && password.valido == true){
  
                    guardar();
                    setUsuario({campo: "", valido:null});
                    setEmail({campo: "", valido:null});
                    setPassword({campo: "", valido:null});
                     
                  }

                    else{
                      if(usuario.valido == false || usuario.campo == ""){
                        setUsuario({...usuario, valido:false});
                      }
                      if(email.valido == false || email.campo == ""){
                        setEmail({...email, valido:false});
                      }
                      if(password.valido == false || password.campo == ""){
                        setPassword({...password, valido:false});
                      }
                    }
                   
                   } } >Enviar</button>
            
            
          
          </div>
        </form>    

</section>
<div className='table-container'>
<h1>Lista de usuarios</h1>
<table>
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Password</th>
        </tr>
    </thead>
    <tbody>
        {usuarios.map(usuario => {
            return(
                <tr>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.password}</td>
                </tr>
            )
        })}

    </tbody>

</table>
</div>
    </div>
  );
}

export default App;
