---
title: PowerShell
description: ''
---

## Become Administrator

```sh
start-process PowerShell -verb runas
```

## Create link

```sh
cmd /c mklink /D "C:\Users\m\Projects" "\\wsl.localhost\Ubuntu-24.04\home\kayaman\Projects"
```

## Add to Path

```ps
$oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
if ($oldPath.Split(';') -inotcontains 'C:\minikube'){
  [Environment]::SetEnvironmentVariable('Path', $('{0};C:\minikube' -f $oldPath), [EnvironmentVariableTarget]::Machine)
}
```
## Create aliases

```sh
code $PROFILE
```

```powershell title="Microsoft_Powershell_profile.ps1"
Set-Alias -Name tf -Value terraform
Set-Alias -Name k -Value kubectl
```
