
' Verificacion si la impresora ya esta asignada, si esta asignada no se realiza nuevamente la configuracion de impresora


if JavaWindow("Interact-v7.8-CVT-04Oct16").JavaInternalFrame("NonModalPopupPresImpl$NonModal").JavaObject("PrinterIcon").Exist then
Reporter.ReportEvent micPass, "Printer Ok", "Printer already installed"
ExitAction
End if



				'						+++++++++Asignacion de impresoras:
								Window("Interact-v7.3-CVT-05Jul16").Type micCtrlDwn + "p" + micCtrlUp

								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaList("Seleccionar :").Select "Asignar las impresoras"
								wait 1
								Do
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora de Boletos").Set "OFF"
									wait 1
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaCheckBox("Impresora de Boletos").Set "ON"
								Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Exist(0) = False
								

								wait 1
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraDeBoletos").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraDeBoletos").Set DataTable("Printer",dtGlobalSheet)
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("ImpresoraDeBoletos").GetROProperty("text")
								Loop While VerificaCampoIngresado <> DataTable("Printer",dtGlobalSheet)
					
					
					
								 Do
								 	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").SetFocus
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").Set "2A"
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaEdit("TipoDeRutina").GetROProperty("text")
								Loop While VerificaCampoIngresado <> "2A"
								
								If JavaWindow("Interact-v7.10-CVT-16Nov16").JavaDialog("Funciones de la impresora").JavaEdit("Impresora_Station").Exist(0) Then
									
									Do
										JavaWindow("Interact-v7.10-CVT-16Nov16").JavaDialog("Funciones de la impresora").JavaEdit("Impresora_Station").Set DataTable("AAA_STATION",global)
								 		wait 1
										VerificaCampoIngresado = JavaWindow("Interact-v7.10-CVT-16Nov16").JavaDialog("Funciones de la impresora").JavaEdit("Impresora_Station").GetROProperty("text")
									Loop While VerificaCampoIngresado <> DataTable("AAA_STATION",global)
									
								End If
								
								JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - PrinterDetails.png", True
								Environment("Photo") = Environment("Photo") + 1
								wait 1
								JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Funciones de la impresora").JavaButton("OK").Click
								
								
									'espera de confirmacion de asignacion de impresora(Si la impresora entrega error se detiene la prueba)
									Do
										If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("MensajePopUp").Exist(0) Then
											JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click								
										End If
									Loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("ConfirmacionImpresoras").Exist(0) = false
									
									If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Exist(3) Then
										MensajeConfirmacionImpresora = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("ConfirmacionImpresoras").GetROProperty("text")
										JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - PrinterDetails.png", True
										Environment("Photo") = Environment("Photo") + 1
										JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").CaptureBitmap  "Captura.png", True
										BuscaMensajeOK = InStr(1, MensajeConfirmacionImpresora, "OK")
											If BuscaMensajeOK <> 0 Then
												JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("PopUp OK").Click
												Reporter.ReportEvent micPass, "Printer Ok", MensajeConfirmacionImpresora, "Captura.png"												
												else
												JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("Cancelar").Click
												Reporter.ReportEvent micFail, "Printer Error", MensajeConfirmacionImpresora, "Captura.png"
												DataTable("ErrorOUT") = MensajeConfirmacionImpresora
												ExitTestIteration
											End If
									End If



