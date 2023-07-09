//https://teachablemachine.withgoogle.com/models/vjwQ5W-Y2/
var prediction1=""
var prediction2=""
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90,
   
})

camera=document.getElementById("camera")
Webcam.attach("#camera")
function takeSnapshot(){
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>' 
    })
}

console.log("ml5:versions",ml5.version )
classifier= ml5.imageClassifier("//https://teachablemachine.withgoogle.com/models/vjwQ5W-Y2/model.json", modelLoaded)

function modelLoaded(){
    console.log("model is loaded")
}

function speak(){
    var synthesis= window.speechSynthesis
    speakData1="The first prediction is "+ prediction1
    speakData2="The second prediction is "+ prediction2
    var utterThis= new SpeechSynthesisUtterance(speakData1+speakData2)
    synthesis.speak(utterThis)
}




function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        document.getElementById("result_gesture_name").innerHTML=results[0].label
        document.getElementById("result_gesture_name2").innerHTML=results[1].label
        prediction1=results[0].label
        prediction2=results[1].label
        speak()
        if(results[0].label=="Ok Hand"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }

        if(results[0].label=="Thumbs Up"){
            document.getElementById("update_gesture").innerHTML="&#128077;";

        }
        if(results[0].label=="Victory Hand"){
            document.getElementById("update_gesture").innerHTML="&#9996;";

        }

        if(results[1].label=="Ok Hand"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }

        if(results[1].label=="Thumbs Up"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }

        if(results[1].label=="Victory Hand"){
            document.getElementById("update_gesture").innerHTML="&#9996;";

        }


    }
}
