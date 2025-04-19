# Test Case: Custom Timer Setup and Reminder Alert

## Test Case ID: TC-TIMER-001

**Title:** Verify user can set a timer interval and receive alerts  
**Module:** Reminder System  
**Tested By:** Bahare Taheri  
**Date:** 2025-04-19  
**Priority:** High  
**Type:** Functional / UI

---

### Precondition:

User is on the timer UI and the page is fully loaded.

### Test Steps:

1. User selects a time interval (e.g., 45 minutes) from dropdown/input.
2. User clicks on “Set Timer” button.
3. User leaves the tab open and works for 45 minutes.

### Expected Result:

- A notification (alert sound or pop-up) is triggered after 45 minutes.
- Timer resets automatically and continues the reminder cycle.

### Actual Result:

✅ (working as expected)

---

## Additional Test Cases

### TC-TIMER-002 — Validate default reminder time

Steps: Open app without selecting a custom time  
Expected: Default 45 min reminder is active

### TC-TIMER-003 — User changes reminder time mid-cycle

Steps: Start 45-min timer > change to 30 min  
Expected: New timer starts from 30 min
