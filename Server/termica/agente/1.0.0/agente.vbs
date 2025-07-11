Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.SHell")
WinScriptHost.Run Chr(34) & "./agente.bat" & Chr(34), 0
Set WinsCriptHost = Nothing