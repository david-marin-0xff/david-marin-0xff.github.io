param(
    [Parameter(Mandatory=$true)]
    [string]$Title
)

# Define date and filename
$Date = (Get-Date -Format "MMMM yyyy")
$Slug = ($Title -replace "\s+", "-").ToLower()
$FilePath = ".\posts\$Slug.html"

# Load the template
$Template = Get-Content ".\posts\_template.html" -Raw

# Replace placeholders
$Content = $Template -replace "{{TITLE}}", $Title `
                     -replace "{{DATE}}", $Date `
                     -replace "{{CONTENT}}", "This is a new post written on $Date."

# Save new post file
Set-Content -Path $FilePath -Value $Content -Encoding UTF8
Write-Host "✅ Created post: $FilePath"

# Update index.html archive section
$IndexPath = ".\index.html"
$IndexContent = Get-Content $IndexPath -Raw

# Create new list item
$NewLink = "        <li><a href=""posts/$Slug.html"">$Title</a></li>"

# Insert before </ul> (only if not already present)
if ($IndexContent -notmatch [regex]::Escape($NewLink)) {
    $IndexContent = $IndexContent -replace "(?s)(<ul>)(.*?)(</ul>)", "`$1`$2`r`n$NewLink`r`n`$3"
    Set-Content -Path $IndexPath -Value $IndexContent -Encoding UTF8
    Write-Host "🪶 Added link to archive in index.html"
} else {
    Write-Host "⚠️ Post link already exists in index.html"
}

# Commit and push changes
git add .
git commit -m "Add post: $Title"
git push

Write-Host "🚀 Pushed to GitHub successfully!"
