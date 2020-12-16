#!/bin/bash
export DISPLAY=:1
Xvfb $DISPLAY -screen 0 1024x768x16 &
fluxbox -screen 0 &
x11vnc -display $DISPLAY -bg -forever -usepw -xkb &
wait