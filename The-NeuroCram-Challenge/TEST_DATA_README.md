# Test Data & Admin Login Guide

## Quick Test Setup

This project includes test data and an admin account for quick testing of the NeuroCram intelligence modules.

## Admin Login Credentials

**Email:** `admin@neurocram.com`  
**Password:** `adminpass`

## How It Works

### Admin User Flow

1. **Login** with admin credentials (`admin@neurocram.com` / `adminpass`)
2. **Click "Generate Plan"** button on the hero section
3. The system will **automatically skip the input modal** and load pre-configured test data
4. Intelligence modules will appear with the launch sequence animation

### Regular User Flow

1. **Login** with any other email (or create a new account)
2. **Click "Generate Plan"** button
3. The **Generate Plan Modal** will appear as normal
4. Fill in exam details, student profile, and constraints
5. Click "Generate Plan" to see the intelligence modules

## Test Data Included

The test data file (`src/data/testData.js`) contains:

### Exams (4 total)

- **Mathematics** - April 15, 2025 (Difficulty: 4, Confidence: 2, High grade)
- **Physics** - April 20, 2025 (Difficulty: 5, Confidence: 3, Pass)
- **Chemistry** - April 18, 2025 (Difficulty: 3, Confidence: 4, Improve)
- **Biology** - April 25, 2025 (Difficulty: 3, Confidence: 3, High grade)

### Student Profile

- Study Hours: 6 hours/day
- Preferred Window: Night
- Stress Level: Medium
- Sleep: 7.5 hours
- Past Score: 72%

### Constraints

- Unavailable Days: April 12, April 19
- Major Commitments: Work shift, Family event
- Mandatory Topics: Calculus, Organic Chemistry
- Skip Topics: Trigonometry

## File Structure

```
src/
  data/
    testData.js          # Test data and admin credentials
  components/
    Modals/
      LoginModal.jsx     # Updated to check admin credentials
  App.jsx                # Updated to handle admin auto-generation
```

## Testing Intelligence Modules

After logging in as admin and clicking "Generate Plan", you'll see:

1. **Overview Module** - Summary stats (exams, days remaining, study hours, performance)
2. **Cram Heatmap** - Subjects sorted by urgency score
3. **Brain Energy Gauge** - Energy levels and burnout risk
4. **Stress Forecast** - 30-day stress prediction chart
5. **Productivity Zones** - Optimal study times by time of day

All modules use the test data to calculate and display intelligence insights.

## Customization

To modify test data, edit `src/data/testData.js`:

```javascript
export const testPlanData = {
  exams: [...],           // Modify exam data
  studentProfile: {...},  // Modify student profile
  constraints: {...}     // Modify constraints
};
```

## Notes

- Admin credentials are hardcoded for testing purposes only
- In production, this should be replaced with proper authentication
- The admin check happens in `LoginModal.jsx` and `App.jsx`
- Test data uses realistic dates relative to current date
