# AI Video Industry Standards Reference

Use this reference before dispatching any AI video production stage. Treat it as the default baseline; if the user, platform, distributor, brand, or festival provides stricter specs, the stricter spec wins.

## Core Standard

A production is industry-standard only when it is controllable, reviewable, legal to deliver, and technically reproducible. Do not measure quality by prompt cleverness alone. Measure it by story clarity, visual continuity, audio intelligibility, color consistency, rights clearance, file conformance, and defect traceability.

## Manju And Vertical Drama Baseline

- The first seconds need a clear viewing reason: conflict, mystery, reversal, spectacle, emotional charge, or character hook.
- Each episode or segment needs a readable dramatic question and a concrete turn, not only atmosphere.
- Mobile viewing comes first when the format is vertical: faces, gestures, subtitles, key props, and action beats must remain readable on a phone screen.
- Scene transitions must preserve who wants what, who opposes them, what changed, and why the next beat is necessary.
- Chapter or episode endings should create a specific unresolved pressure, not a generic cliffhanger.
- Dialogue and subtitles must be concise enough for mobile viewing; subtitles cannot cover faces, key actions, legal disclaimers, or platform UI-safe areas.
- Character identity, costume, age, hair, voice, relationship status, and power dynamics must remain stable across shots unless the story explicitly changes them.

## Film And Cinematic Baseline

- The creative brief must define genre, theme, point of view, emotional promise, target runtime, aspect ratio, and audience.
- The script must contain playable action, character motivation, escalation, reversal, and payoff; visual prompts cannot repair a hollow dramatic spine.
- Storyboard and animatic must define camera size, angle, movement, screen direction, blocking, eyelines, shot duration, transition intent, and audio intent.
- Continuity must track screen direction, axis, geography, props, wardrobe, lighting logic, time of day, emotional state, and performance beat.
- Visual design must define character model sheets, environment rules, color palette, lens language, texture language, typography, and prohibited style drift.
- Editorial rhythm must support the story beat: no beautiful shot stays if it damages clarity, tension, or emotional continuity.
- Sound design must create intelligible dialogue, intentional ambience, motivated effects, controlled music dynamics, and no clipping or distracting artifacts.
- Color finishing must preserve shot-to-shot match, skin or character tone consistency, legal signal ranges for the delivery target, and intentional look management.

## AI-Specific Quality Gates

- Identity consistency: no unplanned face swap, age drift, costume drift, body proportion drift, hand defects, extra limbs, eye-line mismatch, or voice mismatch.
- Temporal stability: no objectionable flicker, crawling textures, melting objects, warping geometry, jittering subtitles, unstable logos, or inconsistent props.
- Motion plausibility: action must follow weight, contact, inertia, camera movement, and spatial continuity believable enough for the chosen style.
- Prompt traceability: record model/tool, version if available, prompt, negative prompt, seed or reproducibility settings if available, source asset, edit pass, and selected take.
- Editorial traceability: selected shots need version IDs so QC defects can be traced back to generation or edit decisions.
- Legal traceability: source images, voices, music, fonts, logos, likenesses, references, and training-sensitive style instructions need a rights status.

## Technical Delivery Baseline

- Establish delivery spec before final output: aspect ratio, resolution, frame rate, duration, codec, container, bitrate target, color space, audio layout, loudness target, subtitle format, caption language, safe area, thumbnail/key art, and file naming.
- Keep project frame rate consistent after the animatic is approved. Mixed frame rates require explicit conform rules.
- Use a color-managed pipeline appropriate to target delivery, such as Rec.709/sRGB for common online video unless the delivery spec says otherwise.
- Keep a versioned master separate from platform encodes. Do not overwrite approved masters.
- For platform delivery, verify the platform's current upload requirements before final claim; platform specs change more often than production principles.

## QC Defect Classes

- `blocker`: rights violation, wrong runtime/spec, corrupted file, missing audio, unreadable subtitles, severe AI artifacts, identity break, story contradiction, unsafe or disallowed content.
- `major`: visible flicker, inconsistent color, distracting continuity jump, weak lip sync, loudness mismatch, unclear dialogue, subtitle timing issue, missing metadata.
- `minor`: small cosmetic artifact, slightly uneven ambience, non-critical caption style issue, isolated frame blemish.

No project may pass final acceptance with unresolved blockers. Major defects require repair unless the user explicitly accepts the risk in `artifacts/accepted-risks.md`.

## Rights And Safety Baseline

- Do not imitate a living artist, actor, influencer, private person, brand, copyrighted character, exact film scene, logo, music track, or voice unless the user provides rights clearance or asks for a legally distinct alternative.
- Do not use real-person likeness, voice clone, or biometric material without consent and clear labeling requirements where applicable.
- Keep all accepted rights risks explicit, dated, and tied to a downstream delivery decision.

## Done Means

The project is done only when the final review can point to concrete evidence: approved brief, approved script breakdown, approved look bible, approved animatic, generation log, edit log, sound log, color log, QC report, delivery manifest, and acceptance review.
