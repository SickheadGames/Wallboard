Wallboard
=========

Our studio wallboard web service.

**This is a work in progress.**


Usage
=====

We use a Raspberry Pi device to both host the webserver and to display the wallboard via the Chromium browser in kiosk mode.


Setup
=============

You need to install Apache, PHP5, Git, and Chromium (and the Microsoft fonts) on your RPi:

```
sudo su
apt-get update
apt-get upgrade
apt-get install apache2
apt-get install php5
apt-get install git-core
apt-get install chromium-browser
apt-get install ttf-mscorefonts-installer
```

Now use Git to install the Wallboard repo into the www folder:

```
TODO!
```

Now edit the config.inc and fill out the details.

```
TODO!
```

