//(if collecting data with php/server instead of MTurk)
var experimentName = "apparentlyPilot";
var submitAddress = "https://web.stanford.edu/~junhongc/cgi-bin/process.php";



var stimuliList = shuffle([ 

["Jane and Sam arrive at the train station, and notice a lot of people going in.", "Jane", "Sam", "Looks like our train is going to be full.", ["There is only one train leaving in the next hour, so it can't be that all these people are on another train.", "But I wouldn't be surprised if it turns out that most of these people are on different train."], ["max", "min"], ["probably-S-CT-HLL-manip", "probably-S-NCT-LHLL-manip", "probably-L-CT-HLL-manip",  "probably-L-NCT-LHLL-manip"], "the train being full"],

["Laura needs a lighter for the birthday candles, and just remembered that Mike is a smoker, so he might have one.", "Laura", "Jim", "I bet Mike has a lighter.", ["If he doesn't, we're screwed.", "If he doesn't, we can still find a way to light the cake."], ["max", "min"], ["hopefully-S-NCT-LHLL-manip", "hopefully-L-CT-HLL-manip", "hopefully-L-NCT-LHLL-manip", "hopefully-S-CT-HLL-manip"], "Mike having a lighter"],

["Lily and James recognize Nick walking across the street with an unfamiliar woman.", "Lily", "James", "I guess Nick has a new girlfriend.", ["They seem too intimate to be just friends. They must be dating.", "Though she could just be a colleague."], ["max", "min"], ["apparently-L-CT-HLL-manip",  "apparently-L-NCT-LHLL-manip", "apparently-S-CT-HLL-manip", "apparently-S-NCT-LHLL-manip"], "Nick having a new girlfriend"],

["Sonia is looking for her grandmother's recipe that she lost.", "Sonia", "Bert", "My mother might still have the recipe.", ["She's the most likely person to have kept everything organized.", "Or she might not. She purges her house every few months."], ["max", "min"], ["maybe-L-NCT-LHLL-manip", "maybe-S-CT-HLL-manip", "maybe-S-NCT-LHLL-manip", "maybe-L-CT-HLL-manip"], "Sonia's mother having the recipe"],

["Maria and John are deciding between taking the train and taking the bus from the airport. When they get to the transportation center, a sign says &lsquo;Trains out of service&rsquo;.", "Maria", "John", "We'll have to take the bus.", ["The bus is the only way to get there.", "We can take a taxi too."], ["max", "min"], ["guess-S-CT-HLL-manip", "guess-S-NCT-LHLL-manip", "guess-L-CT-HLL-manip", "guess-L-NCT-LHLL-manip"], "having to take the bus"],

["Kris and Shane look out the window and see lots of puddles and a wet sidewalk.", "Liz", "Dan", "It looks like it was raining during class.", ["That's the only way that those puddles would have gotten there.", "But maybe some kids made those puddles by playing with a hose."], ["max", "min"], ["musthave-S-NCT-LHLL-manip", "musthave-L-CT-HLL-manip", "musthave-L-NCT-LHLL-manip", "musthave-S-CT-HLL-manip"], "it having rained"],

["Mary and Joe are on their way to visit Lila.", "Mary", "Joe", "Lila might have two cats.", ["She loves cats.", "She loves cats."], ["Cmax", "Cmax"], ["C-1-control-max", "C-1-control-max", "C-1-control-max", "C-1-control-max"], "Lila having two cats"],

["Laura and Jim are planning their holidays.", "Laura", "Jim", "The hotel might be fully booked.", ["It's the vacation season.", "It's the vacation season."], ["Cmin", "Cmin"], ["C-2-control-min", "C-2-control-min", "C-2-control-min", "C-2-control-min"], "whether the hotel is fully booked"],

["James and Prue are talking about bees.", "James", "Prue", "Your shirt might send a signal to bees.", ["Instead of repelling bees.", "Not the color purple."], ["FVerb", "FNoun"], ["F-1-filler-yellow-manip", "F-1-filler-yellow-manip", "F-2-filler-attracts-manip", "F-2-filler-attracts-manip"], "on the color yellow attracting bees"],

["Tom and Jacob are talking about bees.", "Tom", "Jacob", "Your shirt might send a signal to bees.", ["Not the color purple.", "Instead of repelling bees."], ["FNoun", "FVerb"], ["F-2-filler-attracts-manip", "F-2-filler-attracts-manip", "F-1-filler-yellow-manip", "F-1-filler-yellow-manip"], "on the color yellow attracting bees"],

["Dan and Matt are talking about an event.", "Dan", "Matt", "I wonder which men might have gone.", ["Everyone stayed home and watched football instead.", "Tim went but James stayed home."], ["FQNeg", "FNegQ"], ["go-Hs-LH-manip", "go-Hs-LL-manip", "go-LsH-LH-manip", "go-LsH-LL-manip"], "every man having gone to the event"],

["Jim and Bill are talking about an exam.", "Jim", "Bill", "I wonder who passed the exam.", ["Lisa passed, but Bertie didn't.", "They all failed because the exam was too difficult."], ["FNegQ", "FQNeg"], ["exam-LsH-LH-manip", "exam-LsH-LL-manip", "exam-Hs-LH-manip", "exam-Hs-LL-manip"], "every student failing the exam"]

]);


var data = {}; 
var startT = {};
var trialnum = 0;


$(document).ready(function() {
    showSlide("intro");
    // $('#gotoInstructions').click(function() {
    //     document.body.scrollTop = document.documentElement.scrollTop = 0;
    //     showSlide('instructions');
    // });

    document.getElementById('sampleAudio').src = "https://stanford.edu/~junhongc/sw_stimuli2/test.wav";
    
    $('#startbutton').click(function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        var spe = document.getElementById("speaker").checked;
        if (spe == true) {
        showSlide('instructions');
        $('#instr2').hide();
        $('#instrbutton2').hide();
        $('#instrForm').hide();
        $('#mainbutton').hide();
        startT = Date.now();
        }
        else {
            checkboxwarning = "Please check the box to confirm that you meet the necessary requirement, in order to proceed to the experiment.";
            $("#checkboxWarning").html(checkboxwarning);
        }
    });


    $('#instrbutton1').click(function() {
        $('#instr2').show();
        $('#instrbutton2').show();
        $('#instrbutton1').hide();
    });

    $('#instrbutton2').click(function() {
        $('#instrbutton2').hide();
        $('#instrForm').show();
        $('#mainbutton').show();
    });

    $('#mainbutton').click(function() {
        stepExperiment();
    });

});

function showSlide (slideName) {
    $('.slide').hide();
    $('#' + slideName).show();
}


var stimuliVector = {};
var sentenceStim = {};
var followupList = {};
var followup = {};
var audioList = {};
var audioStim = {};
var conditionList = {};
var condition = {};



var conditionRandom1 = Math.floor(Math.random() * 2);
var conditionRandom2 = Math.floor(Math.random() * 4);


function stepExperiment () {

    if (trialnum == 12) { // end the experiment. 
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide("language");

        $('#lgsubmit').click(function() {
            var hear = $('.hearing:checked').val();
            var nat = $('.nat:checked').val();
            var age = $('#age_com').val();
            age = age.replace (/,/g, "");
            // var gender = $('.gen:checked').val();
            var gender = $('#genderForm').serialize();
            gender = gender.replace (/,/g, "");
            // var race = $('.race:checked').val();
            var race = $('#ethnicityForm').serialize();
            race = race.replace (/,/g, "");
            var region1 = $('#home_com').val();
            region1 = region1.replace (/,/g, "");
            var region2 = $('#towns_com').val();
            region2 = region2.replace (/,/g, "");
            var lang1 = $('#lang_com1').val();
            lang1 = lang1.replace (/,/g, "");
            var lang2 = $('#lang_com1').val();
            lang2 = lang2.replace (/,/g, "");
            // var gend_com = $('#gend_com').val();
            // gend_com = gend_com.replace (/,/g, "");
            // var race_com = $('#race_com').val();
            // race_com = race_com.replace (/,/g, "");
            var exp_com = $('#exp_com').val();
            exp_com = exp_com.replace (/,/g, "");

			if ($('.hearing:checked').length > 0 && $('.nat:checked').length > 0) {
            data.hear = hear;
            data.nat = nat;
            data.age = age;
            data.gender = gender;
            data.race = race;
			data.region1 = region1;
            data.region2 = region2;
            data.language1 = lang1;
            data.language2 = lang2;
            // data.gendComts = gend_com;
            // data.raceComts = race_com;
			data.expComts = exp_com;
            data.timeinminutes = (Date.now() - startT)/60000;
			showSlide('finish');
			setTimeout(function() { turk.submit(data)}, 1000); 
            }

            else {
                demoWarning = "Please complete the questionnaire in order to finish the experiment and submit the HIT.";
            $("#demoWarning").html(demoWarning);
            } 

        } ) 
    }
 
    else {

        trialnum += 1;
        stimuliVector = stimuliList[trialnum-1];
        contextStim = stimuliVector[0];
        name1Stim = stimuliVector[1];
        name2Stim = stimuliVector[2];
        sentenceStim = stimuliVector[3];
        followupList = stimuliVector[4];
        followup = followupList[conditionRandom1];
        conditionList = stimuliVector[5];
        condition = conditionList[conditionRandom1];
        audioList = stimuliVector[6];
        audioStim = audioList[conditionRandom2];
        radicalStim = stimuliVector[7];

               
        $(".item_number").html(trialnum);  
        $(".currentContext").html(contextStim); 
        $(".currentName1").html(name1Stim);  
        $(".currentName2").html(name2Stim);  
        $(".currentFollowup").html(followup);
        $(".currentSentence").html(sentenceStim);
        $(".currentRadical").html(radicalStim);

        document.getElementById('currentAudio').src = "https://stanford.edu/~junhongc/sw_stimuli2/" + audioStim + ".wav";

     
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        showSlide('stage'); 
        // $(".question_number").html("0"); 
        $('#responseForm1').hide();
        $('#responseForm2').hide();
        $('#optionalForm').hide();
        // $('#commentBox1').hide();
        // $('#part2button').hide();
        // $('#part3button').hide();
        $('#continue').hide();
        $('#manytimes').hide();
        $('#audiobutton').show();

        $('#audiobutton').click(function() {
            $(".question_number").html("1"); 
            $('#manytimes').show();
            $('#responseForm1').show();
            $('#responseForm2').show();
            $('#optionalForm').show();
            //$('#optional1').show();
            //$('#commentBox1').show();
            // $('#continue').show();
            $('#audiobutton').hide();
            $('#continue').show();
        });

        // $('#part2button').click(function() {
        //     $(".question_number").html("2");         
        //     $('#responseForm1').hide();
        //     $('#responseForm2').show();
        //     $('#part3button').show();
        //     $('#part2button').hide();
        // });

        // $('#part3button').click(function() {
        //     $(".question_number").html("3");
        //     $('#responseForm2').hide();
        //     $('#responseForm3').show();
        //     $('#part3button').hide();
        //     $('#continue').show();
        // });


        //When continue is clicked to move on to the next sound/stage:
        $('#continue').click(function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
           
            // var sliderResponse = $('#sliderval1').val();

            var choiceResponse = $('.likertN:checked').val();

            var betResponse = $('#commentBox1').val();
            betResponse = betResponse.replace (/,/g, "");

            var commentResponse = $('#commentBox2').val();
            commentResponse = commentResponse.replace (/,/g, "");


            // Check for valid answers; all questions from Q1-Q3 must be answered
            if  ($('.likertN:checked').length > 0 && betResponse != "" && Number(betResponse) >= 1 && Number(betResponse) <= 100) {
                
                $(".likertN").prop('checked', false);
                // make continue button available for re-use
                $("#continue").unbind('click');
                // ensure that the comment box is emptied as well
                $(".commentBox").val("");
                // $(".commentBox1").val("");
                // $(".commentBox2").val("");
                // erase warnings 
                $("#warning").html("");
              
                // Write data from collected responses
                trial = {};
                trial.condition = condition;
                trial.audio = audioStim;
                trial.followup = choiceResponse;
                trial.bet = betResponse;
                trial.comment = commentResponse;
                data["trial" + trialnum] = trial;


                // Initialize the sliders again
                // refreshSlider();
            

                // Move on to the next sound
                stepExperiment();
     
                    }
            else { // If any of the questions is not answered:
                warning = "Please answer the questions to continue. Make sure that you have selected a value for Q1 and entered a number between 1 to 100 for Q2.";
                $("#warning").html(warning);
            }
        });
    }
}


// Codes for sliders
// Slider0
// $( function() {
//     $( "#slider0" ).slider({
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//       slide: function( event, ui ) {

//         $("#slider0").css({"background": "#CCFFFF"});
//         $("#slider0 .ui-slider-handle").css({
//                       "background": "#E0F5FF",
//                       "border-color": "#001F29"
//                   });

//         m_val = ui.value;
//         if (m_val < 0) {
//             $(ui.handle).text("?");
//         }
//         else {
//             $(ui.handle).text(m_val);
//         }
//         $( "#sliderval0" ).val( ui.value );
//       }
//     });
//     $( "#sliderval0" ).val( $( "#slider0" ).slider( "value" ) );
//   } );

// // Slider1
// $( function() {
//     $( "#slider1" ).slider({
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//       slide: function( event, ui ) {

//         $("#slider1").css({"background": "#CCFFFF"});
//         $("#slider1 .ui-slider-handle").css({
//                       "background": "#E0F5FF",
//                       "border-color": "#001F29"
//                   });

//         m_val = ui.value;
//         if (m_val < 0) {
//             $(ui.handle).text("?");
//         }
//         else {
//             $(ui.handle).text(m_val);
//         }
//         $( "#sliderval1" ).val( ui.value );
//       }
//     });
//     $( "#sliderval1" ).val( $( "#slider1" ).slider( "value" ) );
//   } );


// // Function that refreshes slider values
// function refreshSlider () {
//     $(".sliders").slider('value', 50);
//     $(".sliders").val(50);
//     $(".slidervals").val(50);
//     $(".ui-slider-handle").text("");
//     $(".sliders").css({"background":""});
//     $(".sliders" + " .ui-slider-handle").css({
//         "background":"#FAFAFA",
//         "border-color": "#CCCCCC" });
// }

// function validate(str, chk, min, max) {
//   n = parseFloat(str);
//   return (chk && !isNaN(n) && n >= min && n <= max);
// }


function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}


function shuffle(v) { // non-destructive.
    newarray = v.slice(0);
    for (var j, x, i = newarray.length; i; j = parseInt(Math.random() * i), x = newarray[--i], newarray[i] = newarray[j], newarray[j] = x);
    return newarray;
}