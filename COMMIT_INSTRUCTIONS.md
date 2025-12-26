# 🛡️ SUPREMA- Genesis Matrix - Commit Instructions

## Pre-Commit Validation

Before committing, ensure you pass all Genesis Matrix validations:

### 1. Run Pre-Commit Hook (Automatic)
```bash
# The .husky/pre-commit hook runs automatically on git commit
# It checks for:
# - Hardcoded hex colors (#D4AF37, etc.)
# - Hardcoded Tailwind classes (bg-white, text-gray-, etc.)
# - Mock/fake/placeholder data
# - Build success
```

### 2. Manual Validation (Optional)
```bash
# Check for hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/ --exclude-dir=assets --exclude="theme.css"

# Check for hardcoded classes
grep -r "bg-white\|bg-gray-\|text-gray-" src/

# Check for mocks
grep -r "mock\|Mock\|fake\|Fake" src/ | grep -v "TODO:"

# Run build
npm run build
```

## Commit Message Format

Follow this format for commits:

```
<type>: <description>

- Bullet point 1
- Bullet point 2
- Bullet point 3

BLOCO X - <Nome do Bloco> ✅
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `chore`: Maintenance tasks
- `docs`: Documentation

## Genesis Matrix Principles

1. ✅ Zero hardcoded colors (use CSS variables)
2. ✅ Zero mock data (use Supabase)
3. ✅ Complete UI states (loading/error/empty)
4. ✅ Realtime where applicable
5. ✅ SSOT (Single Source of Truth)
6. ✅ Pre-commit validation

## Troubleshooting

If pre-commit fails:
1. Fix the issues reported
2. Stage your changes again
3. Commit again

To skip pre-commit (NOT RECOMMENDED):
```bash
git commit --no-verify
```

