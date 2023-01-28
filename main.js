function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
status1="";
object=[];
function modelloaded(){
    console.log("Model is loaded");
    status1=true;
}
function start(){
    object_detecter=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
    input1=document.getElementById("input1").value;
}
function gotResults(error,results){
        if(error){
            console.error(error);
        }
        else{
        console.log(results);
            object=results;
        }
}
function draw(){
    image(video,0,0,380,380);
    if(status1 !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        object_detecter.detect(video,gotResults);
        for(i=0 ; i<object.length;i++){
        document.getElementById("status").innerHTML="Status:Object Detected";
        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label+""+ percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
        if(object[i].label==input1)
       {
         document.getElementById("number").innerHTML=input1+" found";
         video.stop()

         synth=window.speechSynthesis;
        uter=new SpeechSynthesisUtterance(input1+"found");
        synth.speak(uter);
       }

       else{
       document.getElementById("number").innerHTML=input1+" not found";
      }}
      if(object.length==0)
      {
        document.getElementById("number").innerHTML=input1+" not found";   
     }
     
    }
    
    }