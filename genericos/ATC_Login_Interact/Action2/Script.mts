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
			if Window("Interact-v7.3-CVT-05Jul16").Window("Iniciar sesión").Exist(2) = False then
			
			
			
			
			

			
			
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
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("OperatingAirline", dtGlobalSheet)
			Wait 0,5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set "5"
			Wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
			
			
			' verifica si hay algun error en login y termina la iteracion
			If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(3) Then
				MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginError.png", True
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
					JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
				Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
				DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
				ExitTestIteration
				else
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginOK.png", True
				Reporter.ReportEvent micPass, "Login Ok", "Usuario ingresado: " & DataTable("User", dtGlobalSheet), "Captura.png"
			
			
			End If
			
			
			
			Do
				wait 0,5
				Reporter.Filter = rfDisableAll
			Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
			
			Reporter.Filter = rfEnableAll
			
			
			
			
			
			
			'selecciona codigo de ciudad
			Window("Interact-v7.3-CVT-05Jul16").Type micAltDwn +  micF3  + micAltUp
			Do
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar Ciudad").Set "ON"
				wait 1
			Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Exist(0) = False
			
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Set "ON"

			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			

			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").SetFocus
			 	If DataTable("CTYCode", dtGlobalSheet) = "SCL" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "LQ"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "MIA" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "L1"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "GRU" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "0B"
			 	End If
			 	
			 	
			 	
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").GetROProperty("text")
			Loop While VerificaCampoIngresado = ""
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").SetFocus
			wait 1

			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaButton("OK").Click
			
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click
				
				
				
				
				
				
				'						+++++++++Asignacion de impresoras:
'								Window("Interact-v7.3-CVT-05Jul16").Type micCtrlDwn + "p" + micCtrlUp
								wait 1
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaList("Seleccionar :").Select "Asignar las impresoras"
								wait 1
								Do
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "OFF"
									wait 1
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "ON"
								Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Exist(0) = False
								

								wait 1
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").Set "DUMMY"
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").GetROProperty("text")
								Loop While VerificaCampoIngresado <> "DUMMY"
					
					
					
'								 Do
'								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").SetFocus
'									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Set "2A"
'									wait 1
'									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").GetROProperty("text")
'								Loop While VerificaCampoIngresado <> "2A"
					
								wait 1
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaButton("OK").Click
								
								
									'espera de confirmacion de asignacion de impresora
									Do
										If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").Exist(0) Then
											JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click								
										End If

									Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("ConfirmacionImpresoras").Exist(0) = false
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click	
								
								
								
								
								
	
	
					else
					
							Window("Interact-v7.3-CVT-05Jul16").Window("Iniciar sesión").Activate
							Window("Interact-v7.3-CVT-05Jul16").Window("Iniciar sesión").Type micAltDwn +  micF3  + micAltUp
							
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
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("OperatingAirline", dtGlobalSheet)
								Wait 0,5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set "5"
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
								
								
								' verifica si hay algun error en login y termina la iteracion
								If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(7) Then
									MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginError.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
									Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
									DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
									ExitTestIteration
									else
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginOK.png", True
									Reporter.ReportEvent micPass, "Login Ok", "Usuario ingresado: " & DataTable("User", dtGlobalSheet), "Captura.png"
								
								
								End If
								
								
								
								Do
									wait 0,5
									Reporter.Filter = rfDisableAll
								Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
								
								Reporter.Filter = rfEnableAll
							
							
							
'			Cambio de ciudad				
			Window("Interact-v7.3-CVT-05Jul16").Type micAltDwn +  micF3  + micAltUp
			Do
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar Ciudad").Set "ON"
				wait 1
			Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Exist(0) = False
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Set "ON"

			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			

			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").SetFocus
				If DataTable("CTYCode", dtGlobalSheet) = "SCL" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "LQ"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "MIA" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "L1"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "GRU" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "0B"
			 	End If
			 	
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").GetROProperty("text")
			Loop While VerificaCampoIngresado = ""

			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaButton("OK").Click
			
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click				
							
							
							
							
							
							
							

								
'						+++++++++Asignacion de impresoras:
'								Window("Interact-v7.3-CVT-05Jul16").Type micCtrlDwn + "p" + micCtrlUp
								wait 1
								
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaList("Seleccionar :").Select "Asignar las impresoras"
								wait 1
								Do
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "OFF"
									wait 1
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "ON"
								Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Exist(0) = False
								wait 1
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").Set "DUMMY"
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").GetROProperty("text")
								Loop While VerificaCampoIngresado <> "DUMMY"
					
					
					
'								 Do
'								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").SetFocus
'									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Set "2A"
'									wait 1
'									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").GetROProperty("text")
'								Loop While VerificaCampoIngresado <> "2A"
					
								wait 1
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaButton("OK").Click
								
								
									'espera de confirmacion de asignacion de impresora
									Do
										If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").Exist(0) Then
											JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click								
										End If

									Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("ConfirmacionImpresoras").Exist(0) = false
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click	
					
				End if

	
ExitAction

End if



'***************************************************************************************
' si el usuario de la siguiente iteracion es el mismo al anterior no se realiza el login
'***************************************************************************************

UsuarioFilaActual = DataTable.Value(4)
DataTable.SetPrevRow
UsuarioAnterior = DataTable.Value(4)
DataTable.SetNextRow

If  UsuarioFilaActual = UsuarioAnterior Then
	ExitAction
	else

			
			

			
			
			
				'verifica si ya hubo una sesion abierta para seleccionar el tipo de login	
			if Window("Interact-v7.3-CVT-05Jul16").Window("Iniciar sesión").Exist(1) = False  then
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
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("OperatingAirline", dtGlobalSheet)
			Wait 0,5
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set "5"

			Wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
			
			
			' verifica si hay algun error en login y termina la iteracion
			If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(3) Then
				MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
					JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
					JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginError.png", True
				Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
				DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
				ExitTestIteration
				else
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
				JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginOK.png", True
				Reporter.ReportEvent micPass, "Login Ok", "User name entered: " & DataTable("User", dtGlobalSheet), "Captura.png"
			
			
			End If
			
			
			
			Do
				wait 0,5
				Reporter.Filter = rfDisableAll
			Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
			
			Reporter.Filter = rfEnableAll
		End if


End If



'***************************************************************************************
' si el ambiente de pruebas de la siguiente iteracion es el mismo al anterior no se realiza el cambio, de lo contrario se hace todo el login otra vez
'***************************************************************************************


EnvironmentTestFilaActual = DataTable.Value(1)
DataTable.SetPrevRow
EnvironmentTestAnterior = DataTable.Value(1)
DataTable.SetNextRow



If  EnvironmentTestFilaActual = EnvironmentTestAnterior Then
	ExitAction
	else

'Window("Interact-v7.3-CVT-05Jul16").Window("Iniciar sesión").Type micAltDwn +  micF3  + micAltUp
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
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("CodigoDeAerolinea").Set DataTable("OperatingAirline", dtGlobalSheet)
								Wait 0,5
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").SetFocus
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaEdit("DutyCode").Set "5"
								wait 1
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Iniciar sesión").JavaButton("LoginOK").Click
								
								
								' verifica si hay algun error en login y termina la iteracion
								If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(7) Then
									MensajePopUp = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").GetROProperty("label")
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginError.png", True
										JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
									Reporter.ReportEvent micFail, "Login error", MensajePopUp, "Captura.png"
									DataTable("ErrorOUT", dtGlobalSheet) = MensajePopUp
									ExitTestIteration
									else
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
									JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\0 - LoginOK.png", True
									Reporter.ReportEvent micPass, "Login Ok", "Usuario ingresado: " & DataTable("User", dtGlobalSheet), "Captura.png"
								
								
								End If
								
								
								
								Do
									wait 0,5
									Reporter.Filter = rfDisableAll
								Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaStaticText("CargandoLoginExitoso").Exist(0) 
								
								Reporter.Filter = rfEnableAll
							
							
							
'			Cambio de ciudad				
			Window("Interact-v7.3-CVT-05Jul16").Type micAltDwn +  micF3  + micAltUp
			Do
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar Ciudad").Set "ON"
				wait 1
			Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Exist(0) = False
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Set "ON"

			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			

			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").SetFocus
				If DataTable("CTYCode", dtGlobalSheet) = "SCL" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "LQ"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "MIA" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "L1"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "GRU" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "0B"
			 	End If
			 	
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").GetROProperty("text")
			Loop While VerificaCampoIngresado = ""

			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaButton("OK").Click
			
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click				
							
							
							
							
							
							
							

								
'						+++++++++Asignacion de impresoras:
'								Window("Interact-v7.3-CVT-05Jul16").Type micCtrlDwn + "p" + micCtrlUp
								wait 1
								
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaList("Seleccionar :").Select "Asignar las impresoras"
								wait 1
								Do
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "OFF"
									wait 1
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "ON"
								Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Exist(0) = False
								wait 1
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").Set "DUMMY"
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").GetROProperty("text")
								Loop While VerificaCampoIngresado <> "DUMMY"
					
					
					
'								 Do
'								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").SetFocus
'									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Set "2A"
'									wait 1
'									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").GetROProperty("text")
'								Loop While VerificaCampoIngresado <> "2A"
					
								wait 1
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaButton("OK").Click
								
								
									'espera de confirmacion de asignacion de impresora
									Do
										If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").Exist(0) Then
											JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click								
										End If

									Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("ConfirmacionImpresoras").Exist(0) = false
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click	
					
				

	ExitAction

End If




'***************************************************************************************
' si el codigoCTY de la siguiente iteracion es el mismo al anterior no se realiza el cambio, si hay cambios se vuelve a asignar impresora
'***************************************************************************************


CodigoCTYFilaActual = DataTable.Value(3)
DataTable.SetPrevRow
CodigoCTYAnterior = DataTable.Value(3)
DataTable.SetNextRow



If  CodigoCTYFilaActual = CodigoCTYAnterior Then
	ExitAction
	else

			Window("Interact-v7.3-CVT-05Jul16").Type micAltDwn +  micF3  + micAltUp
			Do
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar Ciudad").Set "ON"
				wait 1
			Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Exist(0) = False
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Set "ON"

			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").Set DataTable("CTYCode", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("CTYCode", dtGlobalSheet)
			

			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").SetFocus
				
				If DataTable("CTYCode", dtGlobalSheet) = "SCL" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "LQ"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "MIA" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "L1"
			 	End If
			 	
			 	If DataTable("CTYCode", dtGlobalSheet) = "GRU" Then
			 		JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set "0B"
			 	End If
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").GetROProperty("text")
			Loop While VerificaCampoIngresado = ""

			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").SetFocus
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaButton("OK").Click
			
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click
			
			
			
			'						+++++++++Asignacion de impresoras:
'								Window("Interact-v7.3-CVT-05Jul16").Type micCtrlDwn + "p" + micCtrlUp
								wait 1
								
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaList("Seleccionar :").Select "Asignar las impresoras"
								wait 1
								Do
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "OFF"
									wait 1
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora Boarding Pass").Set "ON"
								Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Exist(0) = False
								wait 1
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").Set "DC8E0C"
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraBoardingPAss").GetROProperty("text")
								Loop While VerificaCampoIngresado <> "DC8E0C"
					
					
					
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Set "2A"
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").GetROProperty("text")
								Loop While VerificaCampoIngresado <> "2A"
					
								wait 1
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaButton("OK").Click
								
								
									'espera de confirmacion de asignacion de impresora
									Do
										If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").Exist(0) Then
											JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click								
										End If

									Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("ConfirmacionImpresoras").Exist(0) = false
								JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click	
	

End If

