 @@ hightlight id_;_10214837_;_script infofile_;_ZIP::ssf5.xml_;_


'Verifica si el PNR se genero en pasos anteriores
If DataTable("PNR_MCPOut", dtGlobalSheet) = "" Then
	Reporter.ReportEvent micFail, "PNR not generated", "PNR not generated"
	DataTable("ErrorOUT", dtGlobalSheet) = "PNR not generated"
	ExitTestIteration	
End If

 @@ hightlight id_;_264850_;_script infofile_;_ZIP::ssf2.xml_;_
 @@ hightlight id_;_264850_;_script infofile_;_ZIP::ssf3.xml_;_

	
Do
Window("Interact-v7.8-CVT-04Oct16").Type  micF1 
	'wait 2
'JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("Reservas").JavaButton("BusquedaPNR").Click @@ hightlight id_;_9964780_;_script infofile_;_ZIP::ssf3.xml_;_
Window("Interact-v7.8-CVT-04Oct16").Type micShiftDwn +  micF2  + micShiftUp
'wait 1
loop While JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Recuperar reserva existente").JavaEdit("CodigoDeReserva").Exist(3) = false



	Do
	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Recuperar reserva existente").JavaEdit("CodigoDeReserva").SetFocus
	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Recuperar reserva existente").JavaEdit("CodigoDeReserva").Set DataTable("PNR_MCPOut", dtGlobalSheet)
	wait 1
	VerificaCampoIngresado = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Recuperar reserva existente").JavaEdit("CodigoDeReserva").GetROProperty("text")
	Loop While VerificaCampoIngresado <> DataTable("PNR_MCPOut", dtGlobalSheet)


JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("Recuperar reserva existente").JavaButton("OK").Click




If JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("DetalleAdvertencia").Exist(3) Then
    JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - PNR_NotFound.png", True
	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").CaptureBitmap "Captura.png", True
	DetalleDeAdvertencia = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaStaticText("DetalleAdvertencia").GetROProperty("label")
	JavaWindow("Interact-v7.3-CVT-05Jul16").JavaDialog("PopupDialog").JavaButton("OK").Click
	DataTable("ErrorOUT", dtGlobalSheet) = DetalleDeAdvertencia
	Reporter.ReportEvent micFail, "PNR not found: " & DataTable("PNR_MCPOut", dtGlobalSheet),DetalleDeAdvertencia, "Captura.png"
	ExitTestIteration
		else
		
		'verifica si se encontro el PNR generado

			NumeroDeReserva = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("Reserva (T)").JavaStaticText("Reserva - Titulo").GetROProperty("label")
			NumeroDeReserva = Replace(NumeroDeReserva, "Reserva - ", "")
			JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - PNR_Found.png", True
			Environment("Photo") = Environment("Photo") + 1
			JavaWindow("Interact-v7.3-CVT-05Jul16").CaptureBitmap "Captura.png", True
			
			If NumeroDeReserva = DataTable("PNR_MCPOut", dtGlobalSheet) Then
				Reporter.ReportEvent micPass, "PNR Found" & NumeroDeReserva, "PNR " & NumeroDeReserva & " found","Captura.png"
					
					'obtiene detalles del ticket
					CantidadFilas = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("Reserva (T)").JavaTable("EmisionTickets - Precios").GetROProperty("rows")
					CantidadFilas = CantidadFilas - 1
					For Iterator = 0 To CantidadFilas
							ValorCelda = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("Reserva (T)").JavaTable("EmisionTickets - Precios").GetCellData(Iterator, 0)
							DetallesTicket = DetallesTicket + vblf + ValorCelda
							DetallesTicket = Replace(DetallesTicket, "<html>", "")
							DetallesTicket = Replace(DetallesTicket, "<b>", "")
							DetallesTicket = Replace(DetallesTicket, "</b>", "")
							DetallesTicket = Replace(DetallesTicket, "<tr>", "")
							DetallesTicket = Replace(DetallesTicket, "<td>", "")
							DetallesTicket = Replace(DetallesTicket, "<table width=""500"">", "")
					Next
					
					
					'obtiene detalles de los pasajeros
					
					CantidadFilas = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva - Pasajeros").GetROProperty("rows")
					CantidadFilas = CantidadFilas - 1
					For Iterator = 0 To CantidadFilas
						ValorCelda = JavaWindow("Interact-v7.3-CVT-05Jul16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva - Pasajeros").GetCellData(Iterator, 0)
						DetallesPasajeros = DetallesPasajeros + vblf + ValorCelda
						DetallesPasajeros = Replace(DetallesPasajeros, "<html>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<b>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "</b>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<tr>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<td>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<table width=""500"">", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<table width=""1066"">", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<table>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<font face=""Lucida Console"" size=""-1"">", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "</font>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<br>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "</td>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "<font size=""-2"">", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "</table>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "</html>", "")
						DetallesPasajeros = Replace(DetallesPasajeros, "</tr>", "")
			
					Next
					Reporter.ReportEvent micPass, "Reservation details" , "Ticket details " & DetallesTicket & vblf &_
																			 "Passengers details" & DetallesPasajeros	
 @@ hightlight id_;_3963574_;_script infofile_;_ZIP::ssf12.xml_;_
			
				else
				Reporter.ReportEvent micFail, "PNR found" & DataTable("PNR_MCPOut", dtGlobalSheet), "PNR " & DataTable("PNR_MCPOut", dtGlobalSheet) & " not found", "Captura.png"
				DataTable("ErrorOUT", dtGlobalSheet) = "PNR " & DataTable("PNR_MCPOut", dtGlobalSheet) & " not found"
				RunAction "ATC_Terminar_Transaccion(Ignorar_Y_Cerrar) [ATC_Terminar_Transaccion(Ignorar_Y_Cerrar)]", oneIteration
				ExitTestIteration
			End If

	
End If




					
 @@ hightlight id_;_1643250_;_script infofile_;_ZIP::ssf8.xml_;_











		
		

























