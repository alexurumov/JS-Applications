function solve(){
   let $tableBody = document.getElementsByTagName('tbody')[0];

   $tableBody.addEventListener('click', changeStyleHandler);

   function changeStyleHandler(e){
      let clicked = e.target.parentNode;
      
      clicked.style.cssText = clicked.style.cssText ? '' : 'background-color: #413f5e';

      Array.from($tableBody.children).filter(tr => tr !== clicked).forEach(tr => tr.style.cssText = '');
   }
}
