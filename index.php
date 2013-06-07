<?php

// SICKHEAD PROPRIETARY INFORMATION
//
// This software is supplied under the terms of a license agreement 
// or nondisclosure agreement and may not be copied or disclosed 
// except in accordance with the terms of that agreement.
//
//  Copyright (c) Sickhead Games, LLC
//  All Rights Reserved
//  www.sickheadgames.com

?>
<!DOCTYPE html>
<html>
<head>
    <title>Wallboard</title>

	<link type="text/css" rel="stylesheet" href="deck.core.css" />
	<link type="text/css" rel="stylesheet" href="horizontal-slide.css" />
    <link type="text/css" rel="stylesheet" href="wallboard.css" />

	<script type="text/javascript" src="modernizr.custom.js"></script>
    <script type="text/javascript" src="jquery-2.0.1.js"></script>
	<script type="text/javascript" src="deck.core.js"></script>
    <script type="text/javascript" src="jquery.playSound.js"></script>
	<script type="text/javascript" src="wallboard.js"></script>

</head>
<body class="deck-container">

	<!--
    <div id="tweets">
        <h2>@Sickhead</h2>
		<?php
			$tweets=array("A nu start!","Visit my law blog!","I've made a big mistake", "No i blue myself!");
			foreach ($tweets as $tweet)
			{
				echo '<div class="tweet_card">' . $tweet . '</div>';
			}
		?>  
    </div>
	-->

	<section class="slide">
		<div id="builds">
			<h2>Builds</h2>
			<div id="builds_content"></div>
		</div>
	</section>

	<section class="slide">
		<h2>Other Page</h2>
	</section>

    </body>
</html>