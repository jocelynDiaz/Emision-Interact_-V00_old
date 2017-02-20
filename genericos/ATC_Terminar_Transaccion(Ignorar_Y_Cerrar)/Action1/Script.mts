 @@ hightlight id_;_200278_;_script infofile_;_ZIP::ssf1.xml_;_
 
 
 
Window("Interact-v7.3-07Aug16").Type micCtrlDwn + "i" + micCtrlUp @@ hightlight id_;_200278_;_script infofile_;_ZIP::ssf2.xml_;_


Do
	wait 0,5
	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Ignorar").JavaCheckBox("Ignorar y Cerrar (L)").Set "ON"
	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Ignorar").JavaButton("OK").Click
Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Ignorar").JavaCheckBox("Ignorar y Cerrar (L)").Exist(0)
 @@ hightlight id_;_4213626_;_script infofile_;_ZIP::ssf4.xml_;_
