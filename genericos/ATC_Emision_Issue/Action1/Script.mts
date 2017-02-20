


'Obtiene nombre del primer pasajero en caso de que el PNR contenga solo un pasajero y no se habilite el boton nombre de pasajero en la pantalla de FOP
NombrePasajero = JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaTable("Reserva").GetCellData(0, 0)
NombrePasajero = Split(NombrePasajero, "size=""-1"">")
NombrePasajero1 = Split(NombrePasajero(1), "</b><br></td>")
NombrePasajero1Final = Replace(NombrePasajero1(0), "</font><br></td><td><b>", "")


JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Emitir").Click @@ hightlight id_;_1390938_;_script infofile_;_ZIP::ssf1.xml_;_
wait 1
'JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaList("*").Select "EFECTIVO" @@ hightlight id_;_29501877_;_script infofile_;_ZIP::ssf2.xml_;_



Do
	
if JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("PopupDialog").JavaObject("MetalTitlePane").Exist then 
		JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap "Captura.png", True
		JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - IssueNotGenerated.png", True
	    Reporter.ReportEvent micFail, "can`t with more than two forms of payment", "can`t with more than two forms of payment", "Captura.png"
        JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Click
        
			IF JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("PopupDialog_2").JavaButton("<html><head><style type='text/").Exist(1) THEN
				
				JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("PopupDialog_2").JavaButton("<html><head><style type='text/").Click
				wait 1
				JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Emitir TKT_2").JavaButton("<html><head><style type='text/").Click
			End if 
        RunAction "ATC_Terminar_Transaccion(Ignorar_Y_Cerrar) [ATC_Terminar_Transaccion(Ignorar_Y_Cerrar)]", oneIteration
      	ExitTestIteration	
End if 

	If JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Cotizar itinerario").JavaButton("OK").Exist(1) Then
		JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Cotizar itinerario").JavaButton("OK").Click
		Do
			wait 0,5
		Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Nro PQ").JavaButton("Grabar").Exist(0) = False
		JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Nro PQ").JavaButton("Grabar").Click
		Do
			wait 0,5
		Loop While JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Emitir").Exist(0) = False
		JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Emitir").Click
		
	End If
	
Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaList("FormaDePago").Exist(0) = False


		

formaspago = Split(DataTable("TypeOfFOP", dtGlobalSheet), "|")
cantidad = UBound(formaspago)+1
ValueFOP = Split(DataTable("ValueFOPName", dtGlobalSheet), "|")


if formaspago(0) = "CC" then
formaspagoa= Replace(formaspago(0), "CC", "TARJETA DE CRÉDITO")
End if

	
If cantidad = 1 Then	
				If formaspagoa = "TARJETA DE CRÉDITO" Then
				
					
				
				Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaList("FormaDePago").Select formaspagoa
						wait 1
				 
						
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaList("FormaDePago").GetROProperty("text")
				Loop While VerificaCampoIngresado <> formaspagoa
				
				
				'cierra ventana emitir TKT
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaButton("OK").Click
				
				
				
				
				
				Do
					wait 0,5
				Loop While JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaList("TipoTarjeta").Exist(0) = False
				
				
				Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaList("TipoTarjeta").Select  DataTable("ValueFOPName",global)
						wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaList("TipoTarjeta").GetROProperty("text")
				Loop While VerificaCampoIngresado <> DataTable("ValueFOPName",global)
				
				
				
				Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("NumeroTarjeta").Set DataTable("NumberOfFOP", dtGlobalSheet)
						wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("NumeroTarjeta").GetROProperty("text")
					wait 1
					If JavaWindow("Interact-v7.10-CVT-14Nov16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Exist(1) Then
						JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
						Environment("Photo") = Environment("Photo") + 1
						JavaWindow("Interact-v7.10-CVT-14Nov16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Click
					End If
				
				Loop While VerificaCampoIngresado = ""
				
				
				
				Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("MesExpiracion").Set RandomNumber(1, 12)
						wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("MesExpiracion").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""
				
				

				Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("AnoExpiracion").Set RandomNumber(17, 20)
						wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("AnoExpiracion").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""


				 
				 Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("CodigoAprobacion").Set DataTable("Auth_Code",global)
						wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("CodigoAprobacion").GetROProperty("text")
				Loop While VerificaCampoIngresado <> DataTable("Auth_Code",global)
				 
				 
				 
				 
				 
				  Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("Cuotas").Set DataTable("Quota", dtGlobalSheet)
						wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaEdit("Cuotas").GetROProperty("text")
				Loop While VerificaCampoIngresado <> DataTable("Quota", dtGlobalSheet)
				JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
				Environment("Photo") = Environment("Photo") + 1
				
				
				
			ElseIf formaspago(0) = "BL" Then
				

					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Emitir Ticket").JavaList("*").Select "OTRAS FORMAS DE PAGO"
					wait 1
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Emitir Ticket").JavaButton("<html><head><style type='text/").Click
					wait 1
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaList("1").Select formaspagoa
					wait 1
					
					valorapagar = JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaStaticText("899128(st)").GetROProperty("text")
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaEdit("CLP").Set valorapagar
					wait 1
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaEdit("Detalhes").Set "123456789012"
					wait 1
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaButton("<html><head><style type='text/_2").Click
					JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
					Environment("Photo") = Environment("Photo") + 1
					
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("XX Detalhe Forma de Pagamento").JavaButton("<html><head><style type='text/").Click
			'	
				ElseIf formaspago(0) = "CASH" Then
					JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Emitir TKT").JavaList("*").Select "EFECTIVO" @@ hightlight id_;_2040939_;_script infofile_;_ZIP::ssf4.xml_;_
					JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
					Environment("Photo") = Environment("Photo") + 1
					JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Emitir TKT").JavaButton("<html><head><style type='text/").Click				
				End if

ElseIf cantidad = 2 Then
porctarj = Split(ValueFOP(0), "#")


					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Emitir Ticket").JavaList("*").Select "MULTIPLES FORMAS DE PAGO"
					wait 1
					JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Emitir Ticket").JavaButton("<html><head><style type='text/").Click
					

			
	'mas formas de pago
				cuota = Split(DataTable("Quota", dtGlobalSheet), "|")
				numerotargeta = Split(DataTable("NumberOfFOP", dtGlobalSheet), "|")
			
				numerotargeta = Split(DataTable("NumberOfFOP", dtGlobalSheet), "|")
				
				caxopago = JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaStaticText("769500 CLP  (Total for").GetROProperty("text")
				caxopagoa = trim(caxopago)
				If InStr(caxopagoa , ".") <> 0 Then
					caxopagob = split(caxopagoa,".")
					caxopagoa = caxopagob(0)
					Else 
					caxopagoa = Split(caxopagoa, " ")
				End If
				
				caxopagofinal = caxopagoa
	
				tarjetayprocentaje = Split(DataTable("ValueFOPName", dtGlobalSheet), "|")
				tarjetayprocentaje = Split(DataTable("ValueFOPName", dtGlobalSheet), "|")
				
				tarjetayporcentaje1 = Split(tarjetayprocentaje(0),"#")
				tarjetayporcentaje2 = Split(tarjetayprocentaje(1),"#")
				
				
					
					
					totalfinal=caxopagofinal*tarjetayporcentaje1(1)/100
					totalfinal=Split(totalfinal, ",")
					totalA=totalfinal(0)

					'caxopagofinal(0) 'saldo sin descuentos
					'tarjetayporcentaje1(0)'tarjeta
					'tarjetayporcentaje1(1)'porcentaje

					'tarjetayporcentaje2(0)'tarjeta2
					'tarjetayporcentaje2(1)'porcentaje2
		
				
					
					
					'Primera forma de pago
				
							
							if formaspago(0) = "CC" then
				
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("monto").Set totalA
								wait 1
								do
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaList("primeraformadepago").Select "TARJETA DE CRÉDITO"
								valida = JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaList("primeraformadepago").GetROProperty ("text")
								Loop while valida = ""
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaList("tipotarjeta").Select tarjetayporcentaje1(0)'tarjeta
								
								If JavaWindow("Interact-v7.10-CVT-14Nov16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Exist(1) Then
									JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.10-CVT-14Nov16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Click
								End If
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("numero de tarjeta").Set numerotargeta(0)
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("dia vencimiento").Set mid(DataTable("Expiration_Card",global),1,2)
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("mesvencimiento").Set mid(DataTable("Expiration_Card",global),3,2)
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("Codigo_aprobacion").Set DataTable("Auth_Code",global)
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("quota").Set cuota(0)
									
							ElseIf  formaspago(0) = "BL" then
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("monto").Set totalA
								do
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaList("*_2").Select "OTRAS FORMAS DE PAGO"
								valida = JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaList("*_2").GetROProperty ("text")
								loop While valida = ""
								wait 2
								'valor = JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaStaticText("899005(st)").GetROProperty("text")
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaList("1").Select "BL"
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaEdit("CLP").Set totalA
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaEdit("Detalhes").Set numerotargeta(0)
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaButton("<html><head><style type='text/_2").Click
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("XX Detalhe Forma de Pagamento").JavaButton("<html><head><style type='text/").Click
							ElseIf  formaspago(0) = "CASH" then
							
								JavaWindow("Interact-v7.3-07Aug16_2").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("monto").Set totalA
								JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Múltiples formas de pago").JavaList("*").Select "EFECTIVO" @@ hightlight id_;_25021799_;_script infofile_;_ZIP::ssf9.xml_;_
								
							Else 
								msgbox "no se encuentra forma de pago ingresada"
							End If
							
					'segunda forma de pago

					 		If formaspago(1) = "CC" Then
								 	wait 2
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaList("*").Select "TARJETA DE CRÉDITO"
									wait 2
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaList("*_3").Select tarjetayporcentaje2(0)'tarjeta2
									wait 1
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("*").Set numerotargeta(1)
									If JavaWindow("Interact-v7.10-CVT-14Nov16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Exist(1) Then
									JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.10-CVT-14Nov16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Click
									End If
									wait 1
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("*_2").Set mid(DataTable("Expiration_Card",global),1,2)
									wait 1
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("/").Set mid(DataTable("Expiration_Card",global),3,2)
									wait 1
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("SingleLineEdit").Set "1234"
									wait 1
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("*_3").Set DataTable("Auth_Code",global)
									wait 1
									JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaEdit("*_4").Set cuota(1)
									JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
									Environment("Photo") = Environment("Photo") + 1
									JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Múltiples formas de pago").JavaButton("<html><head><style type='text/").Click
								
								
							ElseIf  formaspago(1) = "BL" then
												
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaList("*").Select "OTRAS FORMAS DE PAGO"
								wait 1
								valor = JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaStaticText("899005(st)").GetROProperty("text")
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaList("1").Select "BL"
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaEdit("CLP").Set valor
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaEdit("Detalhes").Set numerotargeta(1)
								wait 1
								JavaWindow("Interact-v7.3-07Aug16_2").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - FOP.png", True
								Environment("Photo") = Environment("Photo") + 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Detalhe da Forma de Pagamento").JavaButton("<html><head><style type='text/_2").Click
								wait 1
								JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("XX Detalhe Forma de Pagamento").JavaButton("<html><head><style type='text/").Click
								JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Múltiples formas de pago").JavaButton("<html><head><style type='text/").Click
								
							ElseIf  formaspago(1) = "CASH" then
								JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Múltiples formas de pago").JavaList("*_2").Select "EFECTIVO" @@ hightlight id_;_2509391_;_script infofile_;_ZIP::ssf10.xml_;_
								JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Múltiples formas de pago").JavaButton("<html><head><style type='text/").Click @@ hightlight id_;_2103657_;_script infofile_;_ZIP::ssf11.xml_;_
							else
							
								msgbox "forma de pago no encontrado"
							
					 		End If
					 
	

else	
		JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap "Captura.png", True
		JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - IssueNotGenerated.png", True
	    Reporter.ReportEvent micFail, "can`t with more than two forms of payment", "can`t with more than two forms of payment", "Captura.png"
        RunAction "ATC_Terminar_Transaccion(Ignorar_Y_Cerrar) [ATC_Terminar_Transaccion(Ignorar_Y_Cerrar)]", oneIteration
      	ExitTestIteration							
									
				
				
End If			 
				 
				 if JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaButton("OK").Exist(0) then
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Forma de pago: Tarjeta").JavaButton("OK").Click
				End if
				If JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaButton("Ok").Exist(0) Then
				JavaWindow("eLatam-v7.8-CVT-05Oct16").JavaDialog("Múltiplas Formas de Pagamento").JavaButton("Ok").Click
				End If
				

'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
' Verify Billing Information (Puede que se muestre esta pantalla)
'+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

if JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaButton("OK").Exist(3) then

				'Generacion de strings para apellidos en forma aleatoria
				Dim intMax, iLoop, k, intValue, strChar, strVocal, Apellido, Nombre, intNum
				
				' letras del abecedario para utilizar.
				 Chars = "BCDFGHJKLMNPQRSTVWXYZ"
				 Vocals = "AEIOU"
				' Largo de string para nombre.
				
				intMax = RandomNumber(4,9)
				' cantidad de apellidos para generar.
				intNum = 1
				
				Randomize(intValue)
				For iLoop = 1 To intNum
				    Nombre = ""
				    For k = 1 To intMax
				        ' recupera un numero aleatorio entre 0 y 25 (26 letras posibles).
				        'intValue = Fix(23 * Rnd())
				        intValue = RandomNumber(1,21)
				        ' Convierte el cararacter segun el numero seleccionado al azar.
				        strChar = Mid(Chars, intValue + 1, 1)
				        k = k + 1
				        intValue = RandomNumber(1,5)
				        strVocal = Mid(Vocals, intValue + 1, 1)
				        ' genera el apellido.
				        Nombre = Nombre & strChar & strVocal
				    Next
				
				 
				Next
				
				
				 Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("NombreDelTitular").Set Nombre & " " & Nombre
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("NombreDelTitular").GetROProperty("text")
						If VerificaCampoIngresado <> "" Then
							Exit do
						End If
					wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("NombreDelTitular").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""
				
				
 @@ hightlight id_;_26465938_;_script infofile_;_ZIP::ssf12.xml_;_
				  Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("CodigoDelPais").Set "CL"
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("CodigoDelPais").GetROProperty("text")
						If VerificaCampoIngresado <> "" Then
							Exit do
						End If
					wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("CodigoDelPais").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""
				
				
				  Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("DireccionPostal").Set "CALLE " & RandomNumber(100,9999)
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("DireccionPostal").GetROProperty("text")
						If VerificaCampoIngresado <> "" Then
							Exit do
						End If
					wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("DireccionPostal").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""
				
				
				  Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("Ciudad").Set "SANTIAGO"
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("Ciudad").GetROProperty("text")
						If VerificaCampoIngresado <> "" Then
							Exit do
						End If
					wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("Ciudad").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""
				
 @@ hightlight id_;_10119849_;_script infofile_;_ZIP::ssf16.xml_;_
				
				'Telefono
				do @@ hightlight id_;_32595992_;_script infofile_;_ZIP::ssf1.xml_;_
				wait 1
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaList("TipoTelefono").Select "Casa"
				wait 1
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaList("TipoTelefono").Select "Casa"
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaList("TipoTelefono").Select "Casa"
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaList("TipoTelefono").Select "Casa"
				
				VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaList("TipoTelefono").GetROProperty("text")
				Loop while VerificaCampoIngresado = ""
				
				
				  Do
					JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("NumeroTelefono").Set "91293001"
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("NumeroTelefono").GetROProperty("text")
						If VerificaCampoIngresado <> "" Then
							Exit do
						End If
					wait 1
					VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaEdit("NumeroTelefono").GetROProperty("text")
				Loop While VerificaCampoIngresado = ""
				
				JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - TKT_FOP_Details.png", True
				Environment("Photo") = Environment("Photo") + 1
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Verificación del crédito").JavaButton("OK").Click

End if



'
''ERROR
'JavaWindow("Interact-v7.3-07Aug16").JavaDialog("PopupDialog").JavaStaticText("DetalleError").Exist @@ hightlight id_;_3785521_;_script infofile_;_ZIP::ssf17.xml_;_
 @@ script infofile_;_ZIP::ssf17.xml_;_
'
'JavaWindow("Interact-v7.3-07Aug16").JavaDialog("PopupDialog").Click 390,77,"LEFT" @@ hightlight id_;_0_;_script infofile_;_ZIP::ssf18.xml_;_
'JavaWindow("Interact-v7.3-07Aug16").JavaDialog("PopupDialog").JavaButton("<html><head><style type='text/").Click @@ hightlight id_;_3819631_;_script infofile_;_ZIP::ssf19.xml_;_
'



Do
	wait 0,5	
	
	''ERROR
	If JavaWindow("Interact-v7.3-07Aug16").JavaDialog("PopupDialog").JavaStaticText("DetalleError").Exist(0) Then
		DetalleError = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("PopupDialog").JavaStaticText("DetalleError").GetROProperty("text")
		DataTable("ErrorOUT")= DetalleError
		JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\ERROR- IssueNotGenerated.png", True
		JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap "Captura.png", True
		JavaWindow("Interact-v7.3-07Aug16").JavaDialog("PopupDialog").JavaButton("OK").Click
			IF JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("PopupDialog_2").JavaButton("<html><head><style type='text/").Exist(3) THEN
				
				JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("PopupDialog_2").JavaButton("<html><head><style type='text/").Click
				wait 1
				JavaWindow("Interact-v7.8-CVT-04Oct16").JavaDialog("Emitir TKT_2").JavaButton("<html><head><style type='text/").Click
			End if 
			If JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaButton("Cancelar").Exist(3) Then
				JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Emitir TKT").JavaButton("Cancelar").Click
			End If
		
			Reporter.ReportEvent micFalse, "Issue not generated", "Issue not generated", "Captura.png"
			RunAction "ATC_Terminar_Transaccion(Ignorar_Y_Cerrar) [ATC_Terminar_Transaccion(Ignorar_Y_Cerrar)]", oneIteration
		ExitTestIteration

	End If
	
Loop While JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Emitir").Exist(0) = false




JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap "Captura.png", True
If JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Reemitir").Exist Then
   JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\"&Environment("Photo")&" - IssueGenerated.png", True
   Environment("Photo") = Environment("Photo") + 1
'	JavaWindow("Interact-v7.3-07Aug16").JavaInternalFrame("Reserva (T)").JavaButton("Reemitir").Click
	Reporter.ReportEvent micPass, "Issue generated ", "Issue generated", "Captura.png"
'		Guarda los cambios en PNR
'		Guarda los cambios en PNR
'		Guarda los cambios en PNR
'		Guarda los cambios en PNR
			Window("Interact-v7.3-07Aug16").Type micCtrlDwn + "e" + micCtrlUp @@ hightlight id_;_69514_;_script infofile_;_ZIP::ssf1.xml_;_
			
							  Do
									JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Finalizar la transacción").JavaEdit("EjecutivoResponsable").Set "UFT"
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Finalizar la transacción").JavaEdit("EjecutivoResponsable").GetROProperty("text")
										If VerificaCampoIngresado <> "" Then
											Exit do
										End If
									wait 1
									VerificaCampoIngresado = JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Finalizar la transacción").JavaEdit("EjecutivoResponsable").GetROProperty("text")
								Loop While VerificaCampoIngresado = ""
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Finalizar la transacción").JavaCheckBox("Redesplegar PNR").Set "ON" @@ hightlight id_;_18666447_;_script infofile_;_ZIP::ssf3.xml_;_
			JavaWindow("Interact-v7.3-07Aug16").JavaDialog("Finalizar la transacción").JavaButton("OK").Click @@ hightlight id_;_13567093_;_script infofile_;_ZIP::ssf4.xml_;_
	
	else
	JavaWindow("Interact-v7.3-07Aug16").CaptureBitmap  Environment("RutaResultados") & "\ERROR - IssueNotGenerated.png", True
	Reporter.ReportEvent micFalse, "Issue not generated", "Issue not generated", "Captura.png"
	RunAction "ATC_Terminar_Transaccion(Ignorar_Y_Cerrar) [ATC_Terminar_Transaccion(Ignorar_Y_Cerrar)]", oneIteration
	ExitTestIteration
End If






'VUELVE A PANTALLA RESERVA
