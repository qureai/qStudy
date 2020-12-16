#!/bin/bash
export DISPLAY=:1
Xvfb $DISPLAY -screen 0 1600x900x24 &
sleep 5; nohup startxfce4 &
x11vnc -display $DISPLAY -forever -usepw -xkb &
wait