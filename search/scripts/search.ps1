param(
    [Parameter(Position = 0)]
    [string]$JsonInput
)

$ErrorActionPreference = 'Stop'

$scriptPath = Join-Path $PSScriptRoot 'search.py'
$pythonArgs = @($scriptPath)
if ($null -ne $JsonInput) {
    $pythonArgs += '-'
    $JsonInput | & python @pythonArgs
} else {
    & python @pythonArgs
}
exit $LASTEXITCODE
