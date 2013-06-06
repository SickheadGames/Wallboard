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

  include 'config.inc';
  
 	function GetXmlContent($url) 
	{
    global $wallboard_config;
    
    $context = stream_context_create(array(
	    'http' => array(
		    'header'  => "Authorization: Basic " . base64_encode($wallboard_config["teamcity-login"]),
        'timeout' => 60,
	    )
    ));
    
    return simplexml_load_string( file_get_contents($url, false, $context) );
	}
  
 	function ParseProjects() 
	{
    global $wallboard_config;
    
		$projects = GetXmlContent($wallboard_config["teamcity-url"] . "httpAuth/app/rest/projects/");

		$results = array();
		foreach($projects->children() as $proj)
		{
			$results[] = array('name' => (string)$proj['name'], 'id' => (string)$proj['id'], 'builds' => ParseBuilds((string)$proj['id']));
		}

		return json_encode($results);
	}
  
 	function ParseBuilds($projectId) 
	{
    global $wallboard_config;
    
		$buildTypes = GetXmlContent($wallboard_config["teamcity-url"] . "httpAuth/app/rest/projects/$projectId/buildTypes");
       
		$results = array();
		foreach($buildTypes->children() as $bt)
		{
			$id = (string)$bt['id'];

			$buildType = GetXmlContent($wallboard_config["teamcity-url"] . "httpAuth/app/rest/builds?locator=buildType:$id,running:any,count:1");
      
			$build = $buildType->children()[0];
       
			$status = (string)$build['status'];
      if($status == "")
        $status = "SUCCESS";
        
			$results[] = array('id' => $id, 'name' => (string)$bt['name'], 'status' => $status, 'running' => (string)$build['running']);
		}

		return $results;
	}

  echo ParseProjects();
?>
