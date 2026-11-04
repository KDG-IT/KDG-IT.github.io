# SIMA v1 launch shell — 4 Nov 2026

SIMA is an additive, shared navigation and presentation shell at https://kdg-it.github.io/sima/ using the already approved TravelIt RC1 root and ThinkIt T42-C1 standalone subpath. It never migrates or touches existing browser data.

## Four app destinations
- KeepIt: https://kdg-007.github.io/ (RC.11 device QA, canonical notes and document originals)
- ThinkIt: /thinkit/ (standalone diagrams, note bridge pending)
- LiveIt: https://kdg-007.github.io/?connected-app=liveit (older KeepIt-hosted connected workspace, NOT newer standalone W18A)
- TravelIt: / (owner-tested RC1, locally stored trip data)

The same-origin ThinkIt and TravelIt are available inside the shell or full screen. KeepIt and LiveIt launch in their own origin rather than third-party iframes to protect existing browser storage/authentication. Shared-note integration is NOT accomplished simply by navigation. Notes and originals remain owned by KeepIt; other apps retain their domain records. The launcher never copies data, accesses IndexedDB, shares tokens or claims cloud success. Its service worker is scoped to /sima/ and does not intercept other app pages.

Publication uses GitHub Actions to rebuild and verify the original pinned TravelIt RC1 source and unchanged ThinkIt T42-C1 before adding this shell. No replacement of existing root content or service workers.
