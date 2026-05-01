// ================= ESCENAS =================
const scenes = document.querySelectorAll('.scene');
let current = 0;

function showScene(index){
  if(index === current) return;

  scenes[current].classList.add('exit');

  setTimeout(()=>{
    scenes.forEach(s => s.classList.remove('active','exit'));
    scenes[index].classList.add('active');
    current = index;

    // 👉 activar quiz
    if(scenes[index].classList.contains("quiz")){
      currentQ = 0;
      score = { jiang:0, lan:0, wen:0, jin:0, nie:0, wei:0 };
      loadQuestion();
    }

    // 👉 reiniciar carta animada
    if(scenes[index].classList.contains("poem")){
      document.getElementById('letter').innerHTML="";
      cartaIndex=0;
      type();
    }

  },700);
}

showScene(current);

// ================= SCROLL + SWIPE =================
let scrolling=false;

document.addEventListener('wheel',e=>{

  // 👇 NO cambiar escena si estás en carta
  if(scenes[current].classList.contains("carta")) return;

  if(scrolling) return;
  scrolling=true;

  if(e.deltaY>0 && current<scenes.length-1){
    showScene(current+1);
  }else if(e.deltaY<0 && current>0){
    showScene(current-1);
  }

  setTimeout(()=>scrolling=false,1000);
});

let startY=0;

document.addEventListener('touchstart',e=>{
  startY=e.touches[0].clientY;
});

document.addEventListener('touchend',e=>{

  // 👇 NO cambiar escena si estás en carta
  if(scenes[current].classList.contains("carta")) return;

  let endY=e.changedTouches[0].clientY;

  if(startY-endY>50 && current<scenes.length-1){
    showScene(current+1);
  }
  else if(endY-startY>50 && current>0){
    showScene(current-1);
  }
});

// ================= TINTA CURSOR =================
const ink=document.getElementById('ink');

function moveInk(x,y){
  ink.style.left=x+'px';
  ink.style.top=y+'px';
  ink.style.transform='translate(-50%,-50%) scale(1)';

  clearTimeout(ink.t);
  ink.t=setTimeout(()=>{
    ink.style.transform='translate(-50%,-50%) scale(0)';
  },200);
}

document.addEventListener('mousemove',e=>moveInk(e.clientX,e.clientY));
document.addEventListener('touchmove',e=>moveInk(e.touches[0].clientX,e.touches[0].clientY));

// ================= AUDIO =================
const music = document.getElementById('music');
const ambient = document.getElementById('ambient');
const musicBtn = document.querySelector('.music-control');

music.src="wuji.mp3";
ambient.src="viento.mp3";

music.loop=true;
ambient.loop=true;

music.volume=0.5;
ambient.volume=0.3;

let playing=false;

async function toggleMusic(){
  try{
    if(!playing){
      await music.play();
      await ambient.play();
      musicBtn.classList.add('playing');
      playing=true;
    }else{
      music.pause();
      ambient.pause();
      musicBtn.classList.remove('playing');
      playing=false;
    }
  }catch(e){console.log(e);}
}

// ================= CARTA =================
const textCarta=`Si tú fueras Wei Wuxian...
yo sería Jiang Yanli.

Siempre volvería a ti.`;

let cartaIndex=0;

function type(){
  if(cartaIndex<textCarta.length){
    document.getElementById('letter').innerHTML+=textCarta[cartaIndex];
    cartaIndex++;
    setTimeout(type,40);
  }
}

function openLetter(){
  document.getElementById("cartaBox").classList.add("show");
}

// ================= PÉTALOS =================
function createPetal(){
  const p=document.createElement('div');
  p.className='petal';

  const size=Math.random()*8+5;
  p.style.width=size+'px';
  p.style.height=size+'px';
  p.style.left=Math.random()*100+'vw';

  p.style.setProperty('--drift',(Math.random()*150-75)+'px');
  p.style.background='radial-gradient(circle,#ffb6c1,#ff6b81)';
  p.style.animationDuration=(6+Math.random()*6)+'s';

  document.getElementById('petals').appendChild(p);
  setTimeout(()=>p.remove(),12000);
}

setInterval(createPetal,350);

// ================= QUIZ =================
const quiz=[
  {
    q:"¿Qué valoras más?",
    a:[
      {text:"La familia",clan:"jiang"},
      {text:"La disciplina",clan:"lan"},
      {text:"El poder",clan:"wen"}
    ]
  },
  {
    q:"¿Cómo enfrentas problemas?",
    a:[
      {text:"Protegiendo a otros",clan:"jiang"},
      {text:"Siguiendo reglas",clan:"lan"},
      {text:"Rompiendo reglas",clan:"wei"}
    ]
  },
  {
    q:"¿Qué te define?",
    a:[
      {text:"Elegancia",clan:"jin"},
      {text:"Fuerza",clan:"nie"},
      {text:"Lealtad",clan:"jiang"}
    ]
  },
  {
    q:"¿Qué camino elegirías?",
    a:[
      {text:"Justicia aunque duela",clan:"lan"},
      {text:"Proteger a los tuyos",clan:"jiang"},
      {text:"Poder absoluto",clan:"wen"}
    ]
  },
  {
  q:"¿Cómo te ven los demás?",
  a:[
    {text:"Amable y confiable",clan:"jiang"},
    {text:"Elegante y admirable",clan:"jin"},
    {text:"Intenso y directo",clan:"nie"}
  ]
},
{
  q:"¿Qué harías si las reglas son injustas?",
  a:[
    {text:"Seguirlas igual",clan:"lan"},
    {text:"Romperlas",clan:"wei"},
    {text:"Usarlas a tu favor",clan:"jin"}
  ]
},
{
  q:"¿Qué te describe mejor?",
  a:[
    {text:"Protector",clan:"jiang"},
    {text:"Ambicioso",clan:"jin"},
    {text:"Imparable",clan:"nie"}
  ]
},
{
  q:"¿Cómo tomas decisiones?",
  a:[
    {text:"Pensando en los demás",clan:"jiang"},
    {text:"Con lógica y control",clan:"lan"},
    {text:"Siguiendo tu instinto",clan:"wei"}
  ]
},
{
  q:"¿Qué energía tienes?",
  a:[
    {text:"Tranquila y equilibrada",clan:"lan"},
    {text:"Caótica pero sincera",clan:"wei"},
    {text:"Fuerte e intensa",clan:"nie"}
  ]
},
{
  q:"¿Qué te mueve más?",
  a:[
    {text:"El amor por otros",clan:"jiang"},
    {text:"El reconocimiento",clan:"jin"},
    {text:"La lucha constante",clan:"wen"}
  ]
},
{
  q:"Si fueras un símbolo, serías:",
  a:[
    {text:"Un loto",clan:"jiang"},
    {text:"Un abanico dorado",clan:"jin"},
    {text:"Una espada",clan:"nie"}
  ]
},
{
  q:"¿Cómo enfrentas el dolor?",
  a:[
    {text:"Lo oculto para proteger",clan:"jiang"},
    {text:"Lo transformo en poder",clan:"wen"},
    {text:"Lo enfrento de frente",clan:"nie"}
  ]
},
{
  q:"¿Qué tipo de persona eres?",
  a:[
    {text:"Reservada pero firme",clan:"lan"},
    {text:"Libre y rebelde",clan:"wei"},
    {text:"Orgullosa y brillante",clan:"jin"}
  ]
}
];

let currentQ=0;
let score={jiang:0,lan:0,wen:0,jin:0,nie:0,wei:0};

function loadQuestion(){
  const q=quiz[currentQ];
  const question=document.getElementById("question");
  const options=document.querySelectorAll(".quiz-option");

  question.innerText=q.q;

  q.a.forEach((opt,i)=>{
    const textEl=options[i].querySelector(".opt-text");
    textEl.innerText=opt.text;

    // 👇 altura dinámica si texto largo
    if(opt.text.length > 18){
      options[i].style.height="130px";
    }else{
      options[i].style.height="110px";
    }
  });
}

function answer(i){
  const selected=quiz[currentQ].a[i];
  score[selected.clan]++;

  currentQ++;

  if(currentQ<quiz.length){
    loadQuestion();
  }else{
    showResult();
  }
}

// ================= RESULTADO =================
function showResult(){

  let winner=Object.keys(score).reduce((a,b)=>score[a]>score[b]?a:b);

  let clanClass="";
  let text="";

  if(winner==="jiang"){
    clanClass="clan-jiang";
    text=`Clan Jiang 江 — eres hogar, como Jiang Yanli.
Tu calidez le da fuerza a los demás, y tu amor siempre los acompaña.
Eres alguien en quien confiar, un refugio seguro en tiempos de tormenta.
La verdad, tilín, es que hay mucho de ti en este clan pues tu alma libre y sentido de justicia te definen.`;
  }

  if(winner==="lan"){
    clanClass="clan-lan";
    text=`Clan Lan 蓝 — calma y rectitud, como Lan Wangji.
Eres dedicado y perfeccionista, te gusta que las cosas estén en orden y sigan un código.
Tu integridad es admirable, y aunque a veces parezcas distante, tu corazón es profundo y leal.
Sé que aunque guardes mucho de lo que sientes para ti, tu amor y sinceridad por los demás es inmenso.`;
  }
  
  if(winner==="wen"){ 
    clanClass="clan-wen"; 
    text=`Clan Wen 温 — poder y ambición.
Tienes grandes metas y sueños, y no temes luchar por ellos. Eres carismático y sabes cómo influir en los demás para lograr lo que quieres.
Sólo hace falta ver la lucha que hiciste para conseguir boletos para el concierto de ENHYPEN;
estoy segura de que así de determinado serás capaz de vender nabos para conseguir dinero.`;

  }
  
  if(winner==="jin"){ 
    clanClass="clan-jin"; 
    text=`Clan Jin 金 — elegancia y orgullo.
Te gusta que todo se vea bonito y ordenado, y te esfuerzas por mantener una imagen impecable.
Desde la photocard que vas a combinar con tu outfit coquette hasta tu feed de Instagram, todo refleja tu estilo único y sofisticado.
Eres alguien que aprecia la belleza en todas sus formas,
y tu sentido del estilo es tan único que incluso es replicado en Pinterest.`;

  }
  
  if(winner==="nie"){ 
    clanClass="clan-nie"; 
    text=`Clan Nie 聂 — fuerza y determinación.
Eres alguien que no se rinde fácilmente, y cuando te propones algo, lo haces con todo tu corazón.
Tu energía intensa y tu pasión por lo que amas te hacen imparable, y aunque a veces puedas parecer un poco rudo, en el fondo tienes un gran corazón.
Tu espíritu indomable es algo que admiro mucho, y sé que con esa fuerza de voluntad puedes lograr cualquier cosa que te propongas.`;

  }
  
  if(winner==="wei"){ 
    clanClass="clan-wei"; 
    text=`Como Wei Wuxian 魏 — sigues tu propio camino.
Eres alguien que no se conforma con seguir las reglas establecidas, y prefieres vivir de acuerdo a tus propias normas.
Tu espíritu libre y tu naturaleza rebelde te hacen destacar entre la multitud, y aunque a veces puedas parecer un poco caótico, en el fondo tienes un gran corazón.
Tu autenticidad es algo que admiro mucho, y sé que con esa actitud única puedes lograr cosas increíbles.
Hay mucho de Wei Wuxian en ti, y tal vez tenga mucho que ver con el hecho de que me haces sonreír como él.`;

  }

  document.getElementById("quiz-box").style.display="none";

  document.getElementById("ink-result").classList.add("show");

  const result=document.getElementById("quiz-result");
  result.innerHTML="";
  result.classList.add("show");

  setTimeout(()=>{
    writeText(text,result,clanClass);
  },400);

  // 🎁 desbloquear regalo
  document.getElementById("regaloFinal")?.classList.remove("hidden");
}

// ================= TEXTO PALABRA POR PALABRA =================
function writeText(text, container, clanClass){

  const words = text.split(/(\s+)/);
  container.innerHTML="";

  words.forEach((w,i)=>{
    let span=document.createElement("span");
    span.className="ink-word hidden";

    if(
  w.includes("Clan") ||
  w.includes("Jiang") ||
  w.includes("Lan") ||
  w.includes("Wen") ||
  w.includes("Jin") ||
  w.includes("Nie") ||
  w.includes("Wei")
){
  span.classList.add(clanClass);
}

    if(w.includes("Clan") || w.includes("—") || /[江蓝温金聂魏]/.test(w)){
  span.classList.add(clanClass);
}

    span.innerText = w;
    container.appendChild(span);
  });

  const spans=container.querySelectorAll(".ink-word");

  let i=0;

  function reveal(){
    if(i<spans.length){
      spans[i].classList.remove("hidden");

      let delay=70+Math.random()*80;

      if(spans[i].innerText.includes(",")) delay+=80;
      if(spans[i].innerText.includes(".")) delay+=150;

      i++;
      setTimeout(reveal,delay);
    }
  }

  reveal();
}

// ================= PLAYLIST =================
function openSong(url){
  window.open(url,"_blank");
}

// ================= MINI JUEGO =================
function checkJar(el,win){
  const fb=document.getElementById("game-feedback");

  if(win){
    el.style.filter="drop-shadow(0 0 15px gold)";
    fb.innerText="¡Encontraste la Sonrisa del Emperador!";
    fb.style.color="gold";
  }else{
    el.style.opacity="0.3";
    fb.innerText="Jarra vacía...";
  }
}

function nextScene(){
  if(current < scenes.length - 1){
    showScene(current + 1);
  }
}
