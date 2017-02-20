'************************************* Obtiene apellidos al buscar pnr *************************************************************************
'**************************************************** Inicio ***********************************************************************************
contador = 0
total_nombres = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva").GetROProperty("rows")
	
For Iterator = 1 To total_nombres
	JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva").SelectRow contador
	
	nombre = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva").GetCellData (contador, 0)
	nombresa = Split (nombre," ")
	nombresb = Split (nombresa(6),"<b>")
	nombresc = nombresb(1)
	DataTable("PassengerNameOUT", global) = DataTable("PassengerNameOUT", global)   & vblf & nombresc
	
	contador = contador + 1
Next
'************************************* Obtiene apellidos al buscar pnr *************************************************************************
'***************************************************** fin *************************************************************************************

CantidadDePasajeros = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva").GetROProperty("rows")




JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Ver").Click

Do
	wait 0,5
Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Desplegar VCR").JavaRadioButton("Todos los VCR (A)").Exist(0) = False

JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Desplegar VCR").JavaRadioButton("Todos los VCR (A)").Set
JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Desplegar VCR").JavaButton("OK").Click









If JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Lista de VCR").JavaButton("OK").Exist(6) Then
			Tickets = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("QikJInternalFrame").JavaEdit("DetallesPantalla").GetROProperty("text")
			Tickets = Split(Tickets, ".TE ")
			CantidadTickets = UBound(Tickets)
			For Iterator = 1 To CantidadTickets
				NumeroTicket = left(Tickets(Iterator), 14)
				DataTable("NumberTicketOut", dtGlobalSheet) = DataTable("NumberTicketOut", dtGlobalSheet) & vblf & NumeroTicket
			Next
			

	Do
		JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Lista de VCR").JavaEdit("NumeroDeLineaMostrar").Set "1"
		wait 1
		VerificaValorIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Lista de VCR").JavaEdit("NumeroDeLineaMostrar").GetROProperty("text")
	Loop While VerificaValorIngresado = ""
	JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Lista de VCR").JavaButton("OK").Click
End If





'Ticket Electronico
For Iterator2 = 1 To CantidadDePasajeros
	
						
						Do
							wait 0,5
						Loop While JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").Exist(0) = False
						
						' selecciona pasajero siguiente
						If Iterator2 <> 1 Then
						
						CantidadVCR = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaList("Otros VCR:").GetROProperty("items count")
						CantidadVCR = CantidadVCR - 1
							PosicionPasajero = CStr(Iterator2) + " TE "
								For Iterator3 = 0 to CantidadVCR
									VCRPasajero = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaList("Otros VCR:").GetItem(Iterator3)
									BuscaVCRPasajero = InStr(1, VCRPasajero, PosicionPasajero)
									If BuscaVCRPasajero <> 0 Then
										JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaList("Otros VCR:").Select Iterator3
										JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaButton("Ver").Click
										Exit for
									End If
								Next
							
							
							
						End If
						
						NumeroTicket = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("NumeroDeTicket").GetROProperty("text")
						CantidadCupones = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("CantidadCupones").GetROProperty("text")
						Creado = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("Creado").GetROProperty("text")
						Generado = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("Generado").GetROProperty("text")
						Nombre = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("Nombre").GetROProperty("text")
						PNR = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("PNR").GetROProperty("text")
						Tipo = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaStaticText("Tipo").GetROProperty("text")
						
						
						
						JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap "Captura.png", True
						JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - VCR_Ticket_" & NumeroTicket & ".png", True
						Environment("Photo") = Environment("Photo") + 1
						
						CantidadFilas = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetROProperty("rows")
						CantidadFilas = CantidadFilas - 1
						For Iterator = 0 To CantidadFilas
						Num = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Núm.")
						Cx = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Cx")
						Al = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Al")
						Vuelo = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Vuelo")
						Cl = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Cl")
						Dep = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Dep")
						Frm = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Frm_")
						Destino = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Destino")
						Hora = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Hora")
						BkSt = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Bk St")
						Fb = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Fb")
						Stat = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Stat")
						FF = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "FF")
						Equipaje = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("CantidadDeCupones").GetCellData(Iterator, "Equipaje")
						
						StatusVCR =  StatusVCR & vblf & "Numero de ticket: " & NumeroTicket & " Num: " & Num & " Cx: " & Cx & " Al: " & Al & " Vuelo: " & Vuelo & " Cl: " & Cl & " Dep: " & Dep & " Frm: " & Frm & " Destino: " & Destino & " Hora: " & Hora & " BkSt: " & BkSt &  " Fb: " & Fb & " Stat: " & Stat & " FF: " & FF & " Equipaje: " & Equipaje
						DataTable("StatusVCR", dtGlobalSheet) = StatusVCR
						Next
						
						
						
						
						
						
						CantidadFilas = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("FCMI").GetROProperty("rows")
						CantidadFilas = CantidadFilas - 1
						For Iterator = 0 To CantidadFilas
						DetalleInformacionReserva = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaTable("FCMI").GetCellData(iterator, 0)
						InformacionReserva =   InformacionReserva + VBLF + DetalleInformacionReserva 
						Next
						
						
						InformacionReserva = Replace(InformacionReserva, "<html>", "")
						InformacionReserva = Replace(InformacionReserva, "table cellpadding=""0"" border=""0"" color=""#003366""", "")
						InformacionReserva = Replace(InformacionReserva, "<tr>", "")
						InformacionReserva = Replace(InformacionReserva, "<td align=""left"">", "")
						InformacionReserva = Replace(InformacionReserva, "<b>", "")
						InformacionReserva = Replace(InformacionReserva, "<i>", "")
						InformacionReserva = Replace(InformacionReserva, "</i>", "")
						InformacionReserva = Replace(InformacionReserva, "</b>", "")
						InformacionReserva = Replace(InformacionReserva, "</td>", "")
						InformacionReserva = Replace(InformacionReserva, "</tr>", "")
						InformacionReserva = Replace(InformacionReserva, "</table>", "")
						InformacionReserva = Replace(InformacionReserva, "</html>", "")
						InformacionReserva = Replace(InformacionReserva, "<table cellpadding=""2"" border=""0"" color=""#003366"">", "")
						InformacionReserva = Replace(InformacionReserva, "<td align=""right"" width=""150"">", "")
						InformacionReserva = Replace(InformacionReserva, "<td width=""350"" align=""left"">", "")
						InformacionReserva = Replace(InformacionReserva, "<table cellpadding=""2"" border=""0"" color=""#003366"">", "")
						
						InformacionReserva = Replace(InformacionReserva, "&nbsp;", "")
						InformacionReserva = Replace(InformacionReserva, "&nbsp;", "")
						
						InformacionReserva = Replace(InformacionReserva, "<td align=""right"" width=""80"">", "")
						InformacionReserva = Replace(InformacionReserva, "<td width=""100%"" align=""left"">", "")
						InformacionReserva = Replace(InformacionReserva, "<>", "")
						
						If CantidadDePasajeros = 1 Then
							DataTable("NumberTicketOut", dtGlobalSheet) = NumeroTicket
						End If
						
						
						
						Reporter.ReportEvent micPass, "Ticket details: " & NumeroTicket, "Ticket number: " & NumeroTicket & vblf &_
																							 "Coupons QTTY: " & CantidadCupones & vblf &_
																							 "Created: " & Creado & vblf &_
																							 "Generated: " & Generado & vblf &_
																							 "Name: " & Nombre & vblf &_
																							 "PNR: " & PNR & vblf &_
																							 "Type: " & Tipo & vblf &_
																							 "Cx: " & Cx & vblf &_
																							 "Al: " & Al & vblf &_
																							 "Flight: " & Vuelo & vblf &_
																							 "Cl: " & Cl & vblf &_
																							 "Dep: " & Dep & vblf &_
																							 "Frm: " & Frm & vblf &_
																							 "Destiny: " & Destino & vblf &_
																							 "Hour: " & Hora & vblf &_
																							 "Fb: " & Fb & vblf &_
																							 "Stat: " & Stat & vblf &_
																							 "FF: " & FF & vblf &_
																							 "BkSt: " & BkSt & vblf &_
																							 "Baggage: " & Equipaje & vblf &_
																							 "PNRInformation: " & InformacionReserva, "Captura.png"
																							 

Next
JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("VCR-Ticket electrónico").JavaButton("OK").Click






RunAction "ATC_Terminar_Transaccion(Ignorar_Y_Cerrar) [ATC_Terminar_Transaccion(Ignorar_Y_Cerrar)]", oneIteration




















