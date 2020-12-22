#!/bin/bash
export DISPLAY=:1
Xvfb $DISPLAY -screen 0 1500x800x24 &
sleep 5; nohup startxfce4 &
x11vnc -display $DISPLAY -bg -forever -usepw -xkb
python slicer_api.py
wait