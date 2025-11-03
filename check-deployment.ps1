Write-Host "`nChecking deployment status..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://herbscience.shop" -UseBasicParsing -TimeoutSec 10
    Write-Host "SUCCESS! Website is live (Status: 200)" -ForegroundColor Green
    Write-Host "`nYou can now start submitting URLs to Google!" -ForegroundColor Green
} catch {
    Write-Host "Deployment still in progress..." -ForegroundColor Yellow
    Write-Host "Please wait 1-2 more minutes" -ForegroundColor Yellow
}
Read-Host "`nPress Enter to close"

