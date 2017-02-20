Fecha = Date()
Fecha = CStr(Fecha)
Fecha = Replace(Fecha, "-", "")
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

strFolder = "C:\Tests\Results\Runs"
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If

strFolder = "C:\Tests\Results\Runs\" & Fecha
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If





AirportSegments = Replace(DataTable("AirportSegments", dtGlobalSheet), "|", "-")
FlightNumber = Replace(DataTable("FlightNumber", dtGlobalSheet), "|", "")
FlightNumber = Replace(DataTable("FlightNumber", dtGlobalSheet), "*", "")
TypePassenger = Replace(DataTable("TypeAndQuantityOfPassenger", dtGlobalSheet), "|", "")
TypePassenger = Replace(TypePassenger, "#", "")

CarpetaArchivos = Hora & "_" & DataTable("TripType", dtGlobalSheet) & TypePassenger & AirportSegments '& FlightNumber
wait 1

strFolder = "C:\Tests\Results\Runs\" + Fecha + "\" + CarpetaArchivos 
Set objFSO = CreateObject("Scripting.FileSystemObject")
If Not objFSO.FolderExists(strFolder) Then
   objFSO.CreateFolder(strFolder)
End If

Environment("RutaResultados") = strFolder
DataTable("EvidenceFolder", dtGlobalSheet) = strFolder


Environment("Photo") = 0
