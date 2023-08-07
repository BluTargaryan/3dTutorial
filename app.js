const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context  = canvas.getContext("2d");
const frameCount = 179;

//convert number to four digit number, preceded by 0s
function cFD(number) {
    return number.toString().padStart(4, '0');
  }
  
//get path to frame
const currentFrame = (index) =>`./render-images/${cFD(index+1).toString()}.jpg`;

//array for images
const images = [];
//initial frame
let ball = {frame:0};

//populate images with Images, with src set to path 
for(let i=0; i<frameCount;i++){
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}


//gsap animate text onscroll
gsap.fromTo(
    ".ball-text",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      scrollTrigger: {
        scrub: 1,
  
        start: "50%",
        end: "60%",
      },
      onComplete: () => {
        gsap.to(".ball-text", { opacity: 0 });
      },
    }
  );
  
//gsap animate images on scroll
gsap.to(ball, {
frame: frameCount-1,
snap:"frame",
ease:"none",
scrollTrigger:{
    scrub:true,
    pin:'canvas',
    end:"500%",
},
onUpdate:render,
});

//render starter
images[0].onload = render;


//clear canvas and draw image
function render(){
    //to make sure canvas matches image width and height
context.canvas.width=images[0].width;
context.canvas.height = images[0].height;

    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(images[ball.frame],0,0);
}


//console.log(images);