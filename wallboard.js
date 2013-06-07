
// SICKHEAD PROPRIETARY INFORMATION
//
// This software is supplied under the terms of a license agreement 
// or nondisclosure agreement and may not be copied or disclosed 
// except in accordance with the terms of that agreement.
//
//  Copyright (c) Sickhead Games, LLC
//  All Rights Reserved
//  www.sickheadgames.com

///////////////////////////////////////////////////////////////////////////////
// JQuery Extensions

jQuery.fn.exists = function () { return ($(this).length > 0); }

jQuery.fn.pulse = function (duration, easing, props_to, props_from)
{
    var elem = this;

    // Pulse out.
	elem.animate(
		props_to,
        {
            duration: duration,
            easing: easing,
            queue: true,
        });
    
    // Pulse back in.
	elem.animate(
		props_from,
        {
            duration: duration,
            easing: easing,
            queue: true,
            complete: function () { elem.pulse(duration, easing, props_to, props_from); }
        });
}


///////////////////////////////////////////////////////////////////////////////
// TeamCity Stuff

function update_projects()
{
    // Load the projects from the TeamCity server.
    $.ajax({
        dataType: "json",
        url: "./teamcity.php",
        timeout: 10000,
        cache: false,
    })
    .done(function (projects)
    {
        var newCards = new Array();

        $.each(projects, function (i, project)
        {
            var cardId = "tc_" + project.id;
            if (!$("#" + cardId).exists())
            {
                $("#builds_content").append('<div id="parent_' + cardId + '" class="project_card"><h3>' + project.name + '</h3><div id="' + cardId + '" class="project_card"><div>');
            }

            update_builds("#" + cardId, project);

            newCards.push("#parent_" + cardId);
        });

        // Delete old cards.
        $("#builds_content").children().not(newCards.toString()).remove();

        // Refresh this data in a little bit.
        setTimeout(update_projects, 3000);
    })
    .fail(function (jqXHR, textStatus, errorThrown)
    {
        // Wait longer to refresh... don't hammer the
        // server over and over if its not responding.
        setTimeout(update_projects, 20000);
    });
}

function update_builds(projectId, project)
{
	var newCards = new Array();

	$.each(project.builds, function(i, build)
	{
		var cardId = "tc_"+ build.id;
		var card = $("#"+cardId);
		if (!card.exists())
		{
			$(projectId).append('<div id="'+ cardId + '"class="build_card_' + build.status +'">' + build.name + '<div>');
			card = $("#" + cardId);
			card.hide().slideDown(500);
		}
		else
		{
			// Change the state.						
			card.attr('class', 'build_card_' + build.status);
			card.text(build.name);
		}

	    // Store some build state on the card so we 
	    // can react to changes in the state.
		var wasRunning = card.data('running');
		var startRunning = !wasRunning && build.running == "true";
		var buildFailed = card.data('status') == "SUCCESS" && build.status == "FAILED";
		var buildSuccess = card.data('status') == "FAILED" && build.status == "SUCCESS";
		card.data('running', build.running == "true");
		card.data('status', build.status);

	    // Play the success and failure sounds.
        if (buildFailed)
            $.playSound('./build_failed.mp3');
        if (buildSuccess)
            $.playSound('./build_success.mp3');
        if (startRunning)
            $.playSound('./build_running.mp3');

		// If the build is running then start pulsing the card.							
        if (build.running && !wasRunning)
		    card.pulse(500, 'linear', { opacity: 0.25 }, { opacity: 1 });
        else if (!build.running && wasRunning)
		{
		    // Reset the css state.
		    card.stop(true);
		    card.removeAttr('style');
        }

		newCards.push("#"+cardId);
	});

	// Delete old cards.
	$(projectId).children().not(newCards.toString()).remove();
}

function update_slide(index)
{
    if (index == 0)
    {
        $.deck('go', 0)
        setTimeout(function () { update_slide(1) }, 30000);
    }
    else
    {
        $.deck('go', 1)
        setTimeout(function () { update_slide(0) }, 5000);
    }
}

// Start the project update as soon as the
// page is fully loaded.
$(document).ready(function ()
{
    $.deck('.slide');
    update_projects();
    update_slide(0);
});


//$("#builds_content").append('loading...');
//card.hide().animate({width: "show", height: "show", opacity: "show"}, 500);
// Make new build cards fade in.
//$(".tweet_card").hide().animate({ height: "show", opacity: "show" }, 500);
