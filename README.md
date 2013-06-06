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
cd /var/www
git clone git://github.com/SickheadGames/Wallboard.git wallboard
```

Now edit the config.inc and fill out the details.

```
leafpad wallboard/config.inc
```

You can now open the chromium browser in kiosk mode to show the wallboard:

```
chromium --kiosk --incognito http://127.0.1.1/wallboard
```
