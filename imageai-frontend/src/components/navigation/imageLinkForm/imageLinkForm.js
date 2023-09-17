import React from "react";
import './imageForm.css';

// const ImageLinkForm = () =>{
//     return(
//         <div>
//             <p className="f3">
//                 {'This app detects faces!! UwU'}
//             </p>
//             <div className="center">
//                 <div className="form pa4 br4 shadow-1">
//                     {/* <input className="f4 pa2 w-70 center" type="tex"/> */}
//                     <input className="pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" type="tex"/>
//                     <section className="buttons">
//                         <div className="container">
//                         <a className="btn btn-5 center"> SUBMIT </a>
//                         </div>
//                     </section> 
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ImageLinkForm;


//here destructuring is adding { } in the image link form empty brackets

const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div>
            <p className="f3">
                {'This app detects faces!! UwU'}
            </p>
            <div className="center">
                <div className="form pa4 br4 shadow-1">
                    {/* <input className="f4 pa2 w-70 center" type="tex"/> */}
                    <input className="inp pa2 input-reset ba b--white bg-transparent hover-bg-black hover-white w-100" 
                        type="tex" 
                        onChange={onInputChange}
                    />

                    <section className="buttons">
                        <div className="container center">
                        <a className="btn btn-5 bigsize"
                            onClick={onButtonSubmit} > SUBMIT </a>
                        </div>
                    </section> 
                </div>
            </div>
        </div>
    );
}
//onchange above is a react synthetic event
export default ImageLinkForm;