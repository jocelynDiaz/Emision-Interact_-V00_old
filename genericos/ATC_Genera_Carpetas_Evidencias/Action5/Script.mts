﻿Fecha = Date()
Fecha = CStr(Fecha)
Fecha = Replace(Fecha, "-", "")


Fecha = Date()
Fecha = CStr(Fecha)
Fecha = Replace(Fecha, "/", "")

Hora = Time()
Hora = CStr(Hora)
Hora = Replace(Hora, ":", "")

Dim objFSO, strFolder

strFolder = "C:\Tests\"
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If

strFolder = "C:\Tests\Results"
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If

strFolder = "C:\Tests\Results\Seatmodify"
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If

strFolder = "C:\Tests\Results\Seatmodify\" & Fecha
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If



CarpetaArchivos = Hora & "_" & DataTable("PNR_MCPOut", dtGlobalSheet)
wait 1

strFolder = "C:\Tests\Results\Seatmodify\" + Fecha + "\" + CarpetaArchivos 
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If


Environment("RutaResultados") = strFolder
DataTable("EvidenceFolder", dtGlobalSheet) = strFolder

Environment("Photo") = 0
