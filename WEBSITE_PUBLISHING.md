# Current website publication

GitHub Pages publishes the checked static files in `website/` on pushes to `main`.
The existing Hugo/Jekyll sources are retained for history but are not built by the Pages workflow.

To update: rebuild the locally maintained redesign, replace `website/` with its public `site/` output, preserve the legacy CV URL `assets/files/CV_Xinyu_Zhang.pdf`, and push to `main`. Do not copy private content notes, source snapshots, or QA files into the publication directory.

The previous website source remains at commit `bcdddda`; the publication migration can be reverted through Git history.
