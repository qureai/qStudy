#!/bin/bash
export DISPLAY=:1
Xvfb $DISPLAY -screen 0 1500x800x24 &
sleep 5; nohup startxfce4 &
x11vnc -display $DISPLAY -loop -bg -forever -usepw -xkb -reopen &
Slicer-4.11.0-2020-09-12-linux-amd64/Slicer &
python slicer_api.py
wait
