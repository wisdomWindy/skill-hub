# Storyboard Script Format

Use this reference whenever an AI video project reaches `storyboard-animatic`, `production-planning`, or `ai-generation`.

## Purpose

The storyboard script is a production contract, not a loose outline. It must let a downstream agent, video model, image model, or batch script generate each shot independently without guessing missing story, visual, voiceover, subtitle, or timing information.

## Required Files

- `artifacts/storyboard-script.md`: human-readable production script.
- `artifacts/storyboard-script.jsonl`: one JSON object per shot, machine-readable.
- `artifacts/shot-list.md`: compact index derived from the storyboard script.

Do not treat `shot-list.md` as a substitute for `storyboard-script.md`.

## Human-Readable Markdown Format

Each shot must follow this structure:

```markdown
镜头<N>｜<start>-<end>s｜<阶段功能>
画面提示词：<one complete generation prompt; include aspect ratio, subject, setting, action, camera movement, style, lighting, quality, continuity constraints, and avoid items>
生成模式：<integrated_scene | layered_composite | reference_driven>
分层资产：<人物、背景、道具、前景、字幕等是否单独生成；整体生成时写 无；涉及角色参考时必须写角色资产 ID 和路径>
配音文案：<voiceover text exactly for this shot; use 无 if silent>
字幕：<burned-in or subtitle text exactly; use 无 if no subtitle>
音效/音乐：<music and sound intent>
运镜/剪辑：<camera movement, shot duration logic, transition intent>
生成约束：<character identity, wardrobe, props, location, rights, negative prompt, model-specific constraints>
验收要点：<what must be visible/audible/readable for this shot to pass>
```

## JSONL Format

Each line in `storyboard-script.jsonl` must be valid JSON and represent one shot:

```json
{"shot_id":"S01","start":0,"end":6,"duration":6,"function":"开场引入（抓注意力）","visual_prompt":"竖屏9:16，参考角色资产 CHAR_A_REF_01（assets/characters/char_a_ref_01.png）中的同一位原创年轻女性，保持相同脸型、发型、白色针织上衣和温和疲惫神态；她安静坐在 BG_ROOM_DAY_01（assets/backgrounds/room_day_01.png）的窗边桌前...","generation_mode":"reference_driven","layered_assets":[{"asset_id":"CHAR_A_REF_01","type":"character_reference","path":"assets/characters/char_a_ref_01.png","role":"保持女主脸型、发型、服装和气质一致"},{"asset_id":"BG_ROOM_DAY_01","type":"background_reference","path":"assets/backgrounds/room_day_01.png","role":"复用同一房间背景"}],"voiceover":"很多时候...","subtitle":"活得累，大多是因为执念","sound":"轻柔环境底噪，低音量治愈音乐进入","camera":"慢推镜头","transition":"cut","continuity":["same room","same protagonist"],"negative_prompt":"无多余杂物，无水印，无品牌logo，无畸形手指","acceptance":["人物动作清楚","字幕完整可读","画面能独立生成"]}
```

Required JSON keys:

- `shot_id`
- `start`
- `end`
- `duration`
- `function`
- `visual_prompt`
- `generation_mode`
- `layered_assets`
- `voiceover`
- `subtitle`
- `sound`
- `camera`
- `transition`
- `continuity`
- `negative_prompt`
- `acceptance`

## Prompt Quality Standard

The `visual_prompt` must be directly usable by an image or video model. It must include:

- aspect ratio, usually `竖屏9:16` for manju/vertical drama;
- environment and time of day;
- subject and action;
- camera movement or framing;
- lighting and color mood;
- visual style and quality level;
- continuity rules for recurring characters, props, wardrobe, room, weather, and color;
- negative constraints such as no watermark, no logo, no extra limbs, no distorted hands, no unreadable text unless explicitly required.

Weak prompt:

```text
人在房间里思考，治愈风。
```

Production-ready prompt:

```text
竖屏9:16，干净明亮的房间，窗边柔和自然光，同一位原创年轻女性安静坐在木质桌前，右手轻托下巴思考，桌面只有一本书和一杯温水，极简治愈氛围，慢推镜头，高清写实，低饱和度暖色，细节细腻，无多余杂物，无水印，无品牌logo，无畸形手指，人物面部和服装与后续镜头保持一致
```

## Generation Mode Rules

Each shot must declare exactly one `generation_mode`.

- `integrated_scene`: Generate the subject, background, lighting, props, and camera feel as one complete image or video clip. Use this for ordinary shots where natural lighting, perspective, and speed matter more than later replacement control.
- `layered_composite`: Generate character, background, important props, foreground elements, or text plates separately, then composite them in post. Use this when character consistency, reusable backgrounds, motion parallax, foreground occlusion, multilingual replacement, or commercial revision control matters.
- `reference_driven`: Generate the shot using existing reference images, character sheets, background plates, or prior approved frames. Use this when a recurring character, room, costume, product, or brand-safe style must remain consistent across shots.

Default decision:

- Use `integrated_scene` for simple one-off shots, mood shots, lifestyle shots, and low-risk filler.
- Use `layered_composite` for recurring protagonists, reusable locations, dialogue scenes, scenes requiring later camera moves, or shots where the character must be replaced or adjusted independently from the background.
- Use `reference_driven` when any approved reference asset already exists and consistency is more important than generating from text alone.

For `layered_composite`, `layered_assets` must list the required layers, for example:

```json
[
  {"asset_id":"CHAR_A_POSE_01","type":"character","path":"assets/characters/char_a_pose_01.png","role":"same original female protagonist, seated pose, transparent or clean cutout source","prompt":"same original female protagonist, seated pose, transparent or clean cutout source"},
  {"asset_id":"BG_ROOM_DAY_01","type":"background","path":"assets/backgrounds/room_day_01.png","role":"clean bright room by window, no people","prompt":"clean bright room by window, no people"},
  {"asset_id":"PROP_BOOK_01","type":"prop","path":"assets/props/prop_book_01.png","role":"closed book on desk, warm neutral cover","prompt":"closed book on desk, warm neutral cover"}
]
```

For `integrated_scene`, set `layered_assets` to an empty array.

For `reference_driven`, list references in `layered_assets` or continuity notes with their role: character reference, background reference, pose reference, style reference, or prop reference.

## Hard Rule: Character Asset References

If a shot uses a recurring character and `generation_mode` is `layered_composite` or `reference_driven`, the shot must explicitly reference the character asset in both places:

1. `layered_assets` must include the character asset object with:
   - `asset_id`
   - `type`
   - `path`
   - `role`
2. `visual_prompt` must mention the same `asset_id` and, when available, the same `path`.

Valid:

```json
{
  "generation_mode": "reference_driven",
  "layered_assets": [
    {"asset_id":"CHAR_A_REF_01","type":"character_reference","path":"assets/characters/char_a_ref_01.png","role":"女主标准角色参考，保持脸型、发型、服装一致"}
  ],
  "visual_prompt": "竖屏9:16，参考角色资产 CHAR_A_REF_01（assets/characters/char_a_ref_01.png）中的同一位原创年轻女性，保持相同脸型、发型和白色针织上衣..."
}
```

Invalid:

```json
{
  "generation_mode": "reference_driven",
  "layered_assets": [{"asset_id":"CHAR_A_REF_01","type":"character_reference"}],
  "visual_prompt": "同一位年轻女性坐在窗边。"
}
```

This invalid example fails because the asset has no path/role and the prompt does not explicitly cite the asset ID/path. Do not advance to `production-planning` until this is fixed.

## Timing Rules

- Shot time ranges must be contiguous and non-overlapping.
- `duration` must equal `end - start`.
- Voiceover length must be plausible for the shot duration.
- Subtitle length must be readable on mobile; split long subtitles across shots instead of shrinking beyond readability.
- If a shot is silent, explicitly set `voiceover` or `subtitle` to `无`.

## Continuity Rules

Recurring characters require explicit continuity:

- same person identity or intentionally changed identity;
- wardrobe, hair, age, body type, expression range;
- location and prop continuity;
- screen direction and movement direction;
- lighting progression and time of day;
- whether the shot can be generated independently or requires a reference image.
- whether the shot is integrated, layered, or reference-driven.
- for layered or reference-driven recurring characters, the exact character asset ID and path cited in the prompt.

## Acceptance Standard

A storyboard script passes only when:

- every shot can be generated independently from its own row;
- every shot declares `generation_mode`, and layered/reference-driven shots list the assets or references needed;
- layered/reference-driven recurring character shots cite the character asset ID/path in `layered_assets` and in `visual_prompt`;
- the full sequence has a clear hook, progression, turn, and ending pressure or resolution;
- voiceover and subtitles are aligned to shot timing;
- all prompts are specific enough to avoid generic filler visuals;
- JSONL parses line-by-line without comments or trailing commas;
- all rights and safety constraints are explicit.

If any shot lacks a production-ready prompt, voiceover/subtitle alignment, timing, or continuity constraints, do not advance to `production-planning`.
