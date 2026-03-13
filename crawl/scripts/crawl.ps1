param(
    [Parameter(Position = 0)]
    [string]$JsonInput,

    [Parameter(Position = 1)]
    [string]$OutputDir
)

$ErrorActionPreference = 'Stop'

$scriptPath = Join-Path $PSScriptRoot 'crawl.py'
$pythonArgs = @($scriptPath)
if ($null -ne $JsonInput) {
    $pythonArgs += '-'
}
if ($null -ne $OutputDir) {
    $pythonArgs += $OutputDir
}
if ($null -ne $JsonInput) {
    $JsonInput | & python @pythonArgs
} else {
    & python @pythonArgs
}
exit $LASTEXITCODE
