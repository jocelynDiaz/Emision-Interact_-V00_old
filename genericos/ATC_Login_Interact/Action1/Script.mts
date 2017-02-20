 
If JavaWindow("Interact-v7.3-CVT-05Jul16").Exist(0) = False Then
    SystemUtil.Run "C:\Sabre Interact\Res\v7.10PreRelease\app\QikDesktop.exe"
    Relogin = "SI"
    Do
        wait 1
        If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").Exist(0) Then
            JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
        End If
    Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").Exist(0) = False
    else
    Relogin = "NO"
End If



CantidadFilas= DataTable.GetRowCount
FilaActual = DataTable.GetCurrentRow()
If FilaActual = 1 or Relogin = "SI" Then

				'verifica si ya hubo una sesion abierta para seleccionar el tipo de login	
			if JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").Exist(2) = False then

			'Datos de usuario
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaMenu("Iniciar sesión / Cerrar").JavaMenu("Iniciar sesión").Select				
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").Set DataTable("User", dtGlobalSheet)
			Wait 0, 5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetSecure DataTable("Password", dtGlobalsheet)
			Wait 0, 5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").SetFocus	
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("Suffix", dtGlobalSheet)
			Wait 0,5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set DataTable("DutyCode", dtGlobalSheet)
			Wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - LoginData.png", True
			Environment("Photo") = Environment("Photo") + 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
			
			
			' verifica si hay algun error en login y termina la iteracion
			If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(3) Then
				MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - LoginError.png", True
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
					JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
				Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
				DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
				ExitTest
				else
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - LoginOK.png", True
				Environment("Photo") = Environment("Photo") + 1
				Reporter.ReportEvent micPass, "Login Ok", "Usuario ingresado: " & DataTable("User", dtGlobalSheet), "Captura.png"
			
			
			End If
			
			wait (4	)
								
			
			Do
								If JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaStaticText("Version Control(st)").Exist(0) Then
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - Loginversion.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaButton("ok").Click
								End If
				wait 0,5
				Reporter.Filter = rfDisableAll
			Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
			
			Reporter.Filter = rfEnableAll
			'sync issue
			'Wait (20)			

			
			'selecciona codigo de ciudad
			RunAction "ATC_OAC_AAA_Sabre_Interact", oneIteration
'			+++++++++Asignacion de impresoras:
			'RunAction "ATC_Configuracion_Impresora_Sabre_Interact", oneIteration

					else
					JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").Activate

							JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").Type micAltDwn +  micF3  + micAltUp
							
							Do
								wait 0,1
							Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar a CERT").Exist(0) = False
							wait 1
							
							Select Case DataTable("EnvironmentTest", dtGlobalSheet)
								Case "CERT"
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar a CERT").Set "ON"
								Case "TSTS"
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar a TSTS").Set "ON"
							End Select
							
							
							Do
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click
								wait 1
							Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Exist(1)

							
							wait 2
							
							Do
								wait 0,1
							Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(0) = False
							JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
'							JavaWindow("Interact-v7.3-CVT-05Jul16_2").JavaDialog("PopupDialog").JavaButton("BOTON OK").Click


							'Datos de usuario
							
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").Set DataTable("User", dtGlobalSheet)
								Wait 0, 5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetSecure DataTable("Password", dtGlobalsheet)
								Wait 0, 5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").SetFocus	
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("Suffix", dtGlobalSheet)
								Wait 0,5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set DataTable("DutyCode", dtGlobalSheet)
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - LoginData.png", True
								Environment("Photo") = Environment("Photo") + 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
								
								
								' verifica si hay algun error en login y termina la iteracion
								If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(7) Then
									MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - LoginError.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
									Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
									DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
									ExitTest
									else
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - LoginOK.png", True
									Environment("Photo") = Environment("Photo") + 1
									Reporter.ReportEvent micPass, "Login Ok", "Usuario ingresado: " & DataTable("User", dtGlobalSheet), "Captura.png"
								
								
								End If
								
								wait (4	)
								Do
								If JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaStaticText("Version Control(st)").Exist(0) Then
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - Loginversion.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaButton("ok").Click
								End If
								
									wait (0.5)
									Reporter.Filter = rfDisableAll
								Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
								
								Reporter.Filter = rfEnableAll
							
							
							
	'			Cambio de ciudad		
				'selecciona codigo de ciudad
				RunAction "ATC_OAC_AAA_Sabre_Interact", oneIteration
	'			+++++++++Asignacion de impresoras:
				'RunAction "ATC_Configuracion_Impresora_Sabre_Interact", oneIteration

			End if
ExitAction

End if



'***************************************************************************************
' si el ambiente de pruebas de la siguiente iteracion es el mismo al anterior no se realiza el cambio, de lo contrario se hace todo el login otra vez
'***************************************************************************************


EnvironmentTestFilaActual = DataTable("EnvironmentTest", dTGlobalSheet)
'EnvironmentTestFilaActual = DataTable.Value(1)
DataTable.SetPrevRow
EnvironmentTestAnterior = DataTable("EnvironmentTest", dTGlobalSheet)
'EnvironmentTestAnterior = DataTable.Value(1)
DataTable.SetNextRow



If  EnvironmentTestFilaActual <> EnvironmentTestAnterior Then
'	ExitAction
'	else

							Window("Interact-v7.3-CVT-05Jul16").Type micAltDwn +  micF3  + micAltUp
							Do
								wait 0,1
							Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar a CERT").Exist(0) = False
							wait 1
							
							Select Case DataTable("EnvironmentTest", dtGlobalSheet)
								Case "CERT"
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar a CERT").Set "ON"
								Case "TSTS"
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar a TSTS").Set "ON"
							End Select
							
							
							Do
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click
								wait 1
							Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Exist(1)

							
							wait 2
							
							Do
								wait 0,1
							Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(0) = False
							JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
							
							'Datos de usuario
							
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").Set DataTable("User", dtGlobalSheet)
								Wait 0, 5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetSecure DataTable("Password", dtGlobalsheet)
								Wait 0, 5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").SetFocus	
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("Suffix", dtGlobalSheet)
								Wait 0,5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set DataTable("DutyCode", dtGlobalSheet)
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&"- LoginData.png", True
								Environment("Photo") = Environment("Photo") + 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
								
								
								' verifica si hay algun error en login y termina la iteracion
								If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(7) Then
									MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - LoginError.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
									Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
									DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
									ExitTest
									else
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - LoginOK.png", True
									Environment("Photo") = Environment("Photo") + 1
									Reporter.ReportEvent micPass, "Login Ok", "Usuario ingresado: " & DataTable("User", dtGlobalSheet), "Captura.png"
								
								
								End If
								
								wait (4	)
								
								
								Do
								If JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaStaticText("Version Control(st)").Exist(0) Then
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - Loginversion.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaButton("ok").Click
								End If
									wait 0,5
									Reporter.Filter = rfDisableAll
								Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
								
								Reporter.Filter = rfEnableAll
							
							
							
'			Cambio de ciudad				
				'selecciona codigo de ciudad
				RunAction "ATC_OAC_AAA_Sabre_Interact", oneIteration
	'			+++++++++Asignacion de impresoras:
				'RunAction "ATC_Configuracion_Impresora_Sabre_Interact", oneIteration		

	ExitAction

End If




'***************************************************************************************
' si el usuario de la siguiente iteracion es el mismo al anterior no se realiza el login
'***************************************************************************************

UsuarioFilaActual = DataTable("User", dTGlobalSheet)
'UsuarioFilaActual = DataTable.Value(3)
DataTable.SetPrevRow
UsuarioAnterior = DataTable("User", dTGlobalSheet)
'UsuarioFilaActual = DataTable.Value(3)
DataTable.SetNextRow

If  UsuarioFilaActual <> UsuarioAnterior Then
'	ExitAction
'	else

			
			

			
			
			
				'verifica si ya hubo una sesion abierta para seleccionar el tipo de login	
			if JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").Exist(1) = False  then
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaMenu("Iniciar sesión / Cerrar").JavaMenu("Iniciar sesión").Select
				
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("NumeroDeAgente").Set DataTable("User", dtGlobalSheet)
			Wait 0, 5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("Contrasena").SetSecure DataTable("Password", dtGlobalsheet)
			Wait 0, 5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").SetFocus	
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("Suffix", dtGlobalSheet)
			Wait 0,5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set DataTable("DutyCode", dtGlobalSheet)
			JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&"- LoginData.png", True
			Environment("Photo") = Environment("Photo") + 1
			Wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
			
			
			' verifica si hay algun error en login y termina la iteracion
			If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(3) Then
				MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
					JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - LoginError.png", True
				Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
				DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
				ExitTest
				else
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - LoginOK.png", True
				Environment("Photo") = Environment("Photo") + 1
				Reporter.ReportEvent micPass, "Login Ok", "User name entered: " & DataTable("User", dtGlobalSheet), "Captura.png"
			
			
			End If
			
			wait (4	)
								
			
			Do
			If JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaStaticText("Version Control(st)").Exist(0) Then
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - Loginversion.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.10-CVT-08Nov16").JavaDialog("PopupDialog").JavaButton("ok").Click
								End If
				wait 0,5
				Reporter.Filter = rfDisableAll
			Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
			
			Reporter.Filter = rfEnableAll
		End if
		
				'selecciona codigo de ciudad
				RunAction "ATC_OAC_AAA_Sabre_Interact", oneIteration
	'			+++++++++Asignacion de impresoras:
				'RunAction "ATC_Configuracion_Impresora_Sabre_Interact", oneIteration

ExitAction
End If







'***************************************************************************************
' si el codigoCTY de la siguiente iteracion es el mismo al anterior no se realiza el cambio, si hay cambios se vuelve a asignar impresora
'***************************************************************************************
CodigoCTYFilaActual = DataTable("AAA_TCC", dTGlobalSheet)
'CodigoCTYFilaActual = DataTable.Value(7)
DataTable.SetPrevRow
CodigoCTYAnterior = DataTable("AAA_TCC", dTGlobalSheet)
'CodigoCTYAnterior = DataTable.Value(7)
DataTable.SetNextRow



If  CodigoCTYFilaActual = CodigoCTYAnterior Then
	ExitAction
	else
				'selecciona codigo de ciudad
				RunAction "ATC_OAC_AAA_Sabre_Interact", oneIteration
	'			+++++++++Asignacion de impresoras:
				'RunAction "ATC_Configuracion_Impresora_Sabre_Interact", oneIteration
	

End If








