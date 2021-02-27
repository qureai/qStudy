FROM ubuntu:18.04

# Set working directory
WORKDIR /root/

# Install required packages and dependencies
RUN apt-get update && \
	export DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y --no-install-recommends tzdata build-essential autoconf automake gdb git screen wget tar

# Download 3d Slicer
RUN wget http://slicer.kitware.com/midas3/download/bitstream/1329446/Slicer-4.11.0-2020-09-12-linux-amd64.tar.gz && \
    tar -xvf /root/Slicer-4.11.0-2020-09-12-linux-amd64.tar.gz

# Install VNC and GL packages
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && apt-get -y install xorg openbox x11vnc xvfb xterm xfce4 xfce4-goodies \
    libglu1-mesa libpulse-mainloop-glib0 libnss3 libxcursor-dev libpulse-dev libnss3 libxcb-xinerama0\
    libasound2-dev libglfw3-dev libgles2-mesa-dev libbz2-dev libffi-dev zlib1g-dev \
    libxcb-icccm4-dev libxcb-image0-dev libxcb-keysyms1-dev libxcb-randr0 libxcb-render-util0 libxcb-xkb-dev \
    libxkbcommon-x11-dev menu curl x11-utils xfonts-base xfonts-75dpi xfonts-100dpi python-pip python-dev python-qt4 tmux

# Install python packages
RUN pip install --user flask flask_cors

COPY entrypoint.sh /root/
RUN chmod a+x /root/entrypoint.sh
RUN mkdir -p /root/data
RUN mkdir -p /root/annotations
COPY .slicerrc.py /root/
COPY slicer_api.py /root/
COPY buffer.txt /root/

# Expose VNC port
EXPOSE 5900
EXPOSE 5000

# Set GL version
RUN export MESA_GL_VERSION_OVERRIDE=3.2

# Entry script
ENTRYPOINT ["/root/entrypoint.sh"]
