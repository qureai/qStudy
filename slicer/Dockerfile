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

# Define build time arguments
ARG VNC_PASSWORD

# Install VNC and GL packages
RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && apt-get -y install x11vnc xvfb libglu1-mesa libpulse-mainloop-glib0 libnss3 libxcursor-dev \
    libasound2-dev libglfw3-dev libgles2-mesa-dev libbz2-dev libffi-dev zlib1g-dev openbox menu \
    x11-utils xfonts-base xfonts-75dpi xfonts-100dpi python-pip python-dev python-qt4 tmux xterm xfce4 xfce4-goodies

RUN pip install --user pandas && pip install --user flask

# Set VNC password
RUN mkdir -p /root/.vnc
RUN x11vnc -storepasswd ${VNC_PASSWORD} /root/.vnc/passwd
RUN chmod 400 /root/.vnc/passwd
RUN chmod go-rwx /root/.vnc

COPY entrypoint.sh /root/
RUN chmod a+x /root/entrypoint.sh
COPY slicerrc.py /root/
COPY slicer_api.py /root/

# Expose VNC port
EXPOSE 5900

# Set GL version
RUN export MESA_GL_VERSION_OVERRIDE=3.2

# Entry script
ENTRYPOINT ["/root/entrypoint.sh"]