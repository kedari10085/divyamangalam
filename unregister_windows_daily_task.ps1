# Unregister Autonomous Windows Tasks for Divya Mangalam Daily Videos
$tasks = @("DivyaMangalam_Morning_Video", "DivyaMangalam_Evening_Deity_Video", "DivyaMangalam_Mahabharata_Part1_0730")
foreach ($t in $tasks) {
    try {
        Unregister-ScheduledTask -TaskName $t -Confirm:$false -ErrorAction SilentlyContinue
        Write-Host "Unregistered task: $t" -ForegroundColor Yellow
    } catch {
        Write-Host "Task not found or already removed: $t" -ForegroundColor Gray
    }
}
Write-Host "All Divya Mangalam automated scheduled tasks have been removed." -ForegroundColor Green
