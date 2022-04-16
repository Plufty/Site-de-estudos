//Função utilizada para carregar o Header e o Footer
function carregaDocumento(arquivo, target)//a função usa o arquivo onde está o dado e o target é o id da tag onde será carregado
{
    var elemento = document.querySelector(target);

    //Se o elemento não existir então não requisita
    if (!elemento) return;

    var xhr = new XMLHttpRequest();//usando http request para carregar o header e footer
    xhr.open("GET", arquivo, true);
    xhr.onreadystatechange = function()
    {
         if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300)
         {
              elemento.innerHTML = xhr.responseText;
         }
    };

    xhr.send(null);
}

//funções para smooth scroll
const menuLinks = document.querySelectorAll('.nav a[href^="#"]');//Seleciona filtrando dentro do menu de classe nav aqueles linkados na tag A referenciados pelos ID's

function getDistanceFromTheTop(element)
{  
  const id = element.getAttribute("href");//ele pega o id referenciado
  console.log(id);//impressão do id no console somente para conferência
  return document.querySelector(id).offsetTop;//retorna a distância que aquele referenciado para o topo, deverá ser somado o tamanho do menu se acaso ele for fixado.
  
}


function scrollToSection(event)
{
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target);//utiliza a função para pegar a distância que aquela sessão linkada pelo ID está do topo
  smoothScrollTo(0, distanceFromTheTop, 2000); //O smooth scroll é realizado utilizando a constante criada e o último parâmetro é referente à velocidade do smooth scroll 
  
}

menuLinks.forEach((link) =>
{
  link.addEventListener("click", scrollToSection);
});

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) 
{
     const startX = window.scrollX || window.pageXOffset;
     const startY = window.scrollY || window.pageYOffset;
     const distanceX = endX - startX;
     const distanceY = endY - startY;
     const startTime = new Date().getTime();

     duration = typeof duration !== 'undefined' ? duration : 400;

     // Easing function
     const easeInOutQuart = (time, from, distance, duration) => 
     {
          if ((time /= duration / 2) < 1)
          {
               return distance / 2 * time * time * time * time + from;
          }
          return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
     };

     const timer = setInterval(() => 
     {
          const time = new Date().getTime() - startTime;
          const newX = easeInOutQuart(time, startX, distanceX, duration);
          const newY = easeInOutQuart(time, startY, distanceY, duration);
          if (time >= duration) 
          {
               clearInterval(timer);
          }
          window.scroll(newX, newY);
     }, 1000 / 60); // 60 fps
};



//função para manter o menu preso ao topo

window.onload = function(e) 
{
     var offset = document.getElementsByClassName('menu-principal')[0].offsetTop;
     var menu = document.getElementsByClassName('menu-principal')[0];

     document.addEventListener('scroll', function() 
     {
          if (document.body.scrollTop > offset || document.documentElement.scrollTop > offset) 
          {
               menu.style.position = 'fixed';
          } 
          else 
          {
               menu.style.position = 'initial';
          }
     });
}

//Função para menu dropdown, a string recebida é o id daquele botão
function dropDown(string) 
{
  document.getElementById(string).classList.toggle("mostrar-menu");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) 
{
  if (!event.target.matches('.botao-menu-dropdown')) 
  {
    var dropdowns = document.getElementsByClassName("conteudo-menu-dropdown");
    var i;
    for (i = 0; i < dropdowns.length; i++) 
    {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('mostrar-menu')) 
      {
        openDropdown.classList.remove('mostrar-menu');
      }
    }
  }
}
