# spotify-cast-remote
a google cast web sender + receiver acting as a spotify display  

the official spotify applications on cast devices force you to use the devices as audio sources; they don't support the "remote control" feature other spotify platforms do. if your cast device is (for example) a desk accessory, you might want to display your current spotify song / control spotify from your cast device while having the audio come from the spotify app on your PC. the official spotify apps don't let you do this.  

by using spotify's own websocket, this unofficial solution has effectively the same latency as spotify's official apps. it's also using spotify's api routes to extract colors and fetch artist backgrounds - it's modeled after spotify's own clients:
![image](https://github.com/user-attachments/assets/92654e9c-9ba0-48bc-b2ec-4a8e9ed90dd6)

developed for a nest hub 2
