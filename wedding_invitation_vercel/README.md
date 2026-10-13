# Wedding Invitation — v49 mobile start fix

Fixes a mobile-only issue where, after opening the door, the page could resume at Haldi instead of the main invitation.

Changes:
- Disables browser scroll restoration.
- Forces the story to page 1 before the door opens.
- Forces page 1 again after the door animation completes.
- Adds extra Safari/iPhone frame-level scroll reset protection.
- Desktop behavior and all existing animations/links remain unchanged.
