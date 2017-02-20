			'selecciona codigo de ciudad
			Window("Interact-v7.3-CVT-05Jul16").Type micAltDwn +  micF3  + micAltUp
			Do
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Cambiar Ciudad").Set "ON"
				wait 1
			Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Exist(0) = False
			
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Configuración de la aplicación").JavaCheckBox("Detalle OAC:").Set "ON"

			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").Set DataTable("AAA_TCC", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CiudadDeseada").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("AAA_TCC", dtGlobalSheet)
			
			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").SetFocus
				JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").Set DataTable("AAA_TCC", dtGlobalSheet)
				wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("AAA_TCC", dtGlobalSheet)
			

			Do
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").SetFocus
			 	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").Set DataTable("AAA_AC", dtGlobalSheet)
			 	wait 1
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoDeCuenta").GetROProperty("text")
			Loop While VerificaCampoIngresado <> DataTable("AAA_AC", dtGlobalSheet)
			
			
			
			
			If DataTable("AAA_STATION", dtGlobalSheet) <> "" Then
						Do
							JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").SetFocus
							JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").Set DataTable("AAA_STATION", dtGlobalSheet)
							VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").GetROProperty("text")
								If VerificaCampoIngresado <> "" Then
									Exit do	
								End If
							wait 1
							VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaEdit("CodigoOficina2").GetROProperty("text")
						Loop While VerificaCampoIngresado = ""
			End If
			
			
			wait 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - OAC_AAA.png", True
			Environment("Photo") = Environment("Photo") + 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("OAC Ciudad AAA").JavaButton("OK").Click
			
			wait 1
			
			JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Configuración de la aplicación").JavaButton("Boton OK").Click
			
			wait 2
			
			JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - OAC_AAA.png", True
			Environment("Photo") = Environment("Photo") + 1
