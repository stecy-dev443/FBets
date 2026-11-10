# FBets Midnight Gold — brand color system

**Version:** 1.0 · **Color model:** OKLCH-informed tonal ramps, exported as sRGB hex for browser compatibility.

## Brand intent
Midnight Gold is quiet luxury, not gold everywhere: near-black ink establishes trust, layered graphite creates depth, champagne gold marks intentional actions, and emerald/ruby/blue carry operational meaning. Warm ivory reduces the harshness of white on dark surfaces.

## 1. Color roles

| Role | Dark | Light | Purpose |
|---|---|---|---|
| Primary | #E2B857 | #8E6C2C | Main action, selected state, premium marker |
| Primary hover / pressed | #F3DFA2 / #B8903A | #654C25 / #403019 | Interaction feedback |
| Secondary | #24352F | #E1EBE4 | Quiet supporting controls |
| Accent | #69B2FF | #1E65A6 | Live / informational highlight |
| Background | #0B0B10 | #F3F1EB | App canvas |
| Surface 1 | #12121A | #FFFDF8 | Header, base panel |
| Surface 2 | #1A1A24 | #F7F3E9 | Cards |
| Surface 3 | #232330 | #EEE8DA | Raised cards, bet slip |
| Surface 4 | #2C2C3B | #E4DCCB | Popovers, menus |
| Border | #393846 | #D6D0C3 | Quiet separation |
| Strong border | #625A48 | #A99B7C | Focused / important boundary |
| Text primary | #F6F1E7 | #24212A | Main content |
| Text secondary | #C4C0CA | #514D58 | Supporting copy |
| Text muted | #9A98A6 | #686572 | Metadata |
| Text disabled | #898596 | #686572 | Disabled labels (keep readable) |
| Win | #2FCB7E | #147A4A | Positive result; pair with ↑ and WIN |
| Loss | #E95B70 | #A91E37 | Negative result; pair with ↓ and LOSS |
| Live | #69B2FF | #1E65A6 | Live indicator; pair with LIVE label/dot |
| Boost | #E2B857 | #8E6C2C | Boosted price; pair with ✦ / BOOST |
| Warning | #F0B95A | #87520B | Caution / limits |
| Info | #8BC5FF | #205F94 | Neutral information |
| Suspended odds | #8A8793 | #696672 | Unavailable price; use dashed border and SUSPENDED label |

## 2. Tonal scales
The five ramps are organized from near-white (50) to deepest tone (950), with hue/chroma held broadly consistent and lightness stepped for perceptual progression. Hex exports are the browser-ready sRGB approximations.

| Step | Gold | Ink / neutral | Emerald | Ruby | Blue |
|---:|---|---|---|---|---|
| 50 | #FFF9E9 | #F5F4F7 | #E8FBF1 | #FFF0F1 | #EEF7FF |
| 100 | #FDF0C9 | #E5E3EA | #C9F5DC | #FFD9DD | #D9EDFF |
| 200 | #F7DFA2 | #CBC8D4 | #9DE9C1 | #FFB3BD | #B8DCFF |
| 300 | #EFCE78 | #AAA6B6 | #6CDAA2 | #F98595 | #8BC5FF |
| 400 | #E8C365 | #898596 | #3DCA83 | #E95B70 | #69B2FF |
| 500 | #D9AD4D | #6C6879 | #20AD6B | #CF3C55 | #4798ED |
| 600 | #B8903A | #514E5E | #168653 | #B3203A | #3279C5 |
| 700 | #8E6C2C | #3B3947 | #126944 | #8C1B30 | #285D98 |
| 800 | #654C25 | #282732 | #104F36 | #681827 | #20456F |
| 900 | #403019 | #1A1A24 | #0E3829 | #47131E | #19304C |
| 950 | #241A0E | #0B0B10 | #071F18 | #2A0B12 | #0D1C2D |

## 3. Contrast audit (WCAG 2.2)
Ratios use the WCAG sRGB relative-luminance formula. Approved normal text pairs pass AA (4.5:1); large text and meaningful UI boundaries must pass 3:1. Disabled text is kept above AA too, even though inactive controls are exempt from WCAG contrast requirements.

| Text / foreground | Background | Ratio | Result |
|---|---|---:|---|
| #F6F1E7 | #0B0B10 | 17.44:1 | AAA |
| #C4C0CA | #0B0B10 | 10.98:1 | AAA |
| #9A98A6 | #0B0B10 | 6.93:1 | AA |
| #898596 | #0B0B10 | 5.48:1 | AA |
| #F6F1E7 | #1A1A24 | 15.33:1 | AAA |
| #C4C0CA | #232330 | 8.67:1 | AAA |
| #E2B857 | #0B0B10 | 10.50:1 | AAA |
| #241A0E | #E2B857 | 9.13:1 | AAA |
| #241A0E | #F3DFA2 | 12.93:1 | AAA |
| #241A0E | #B8903A | 5.77:1 | AA |
| #2FCB7E | #0B0B10 | 9.32:1 | AAA |
| #E95B70 | #0B0B10 | 5.79:1 | AA |
| #69B2FF | #0B0B10 | 8.80:1 | AAA |
| #F0B95A | #0B0B10 | 11.03:1 | AAA |
| #8BC5FF | #0B0B10 | 10.78:1 | AAA |
| #8A8793 | #0B0B10 | 5.58:1 | AA |
| #D9EDFF | #19304C | 11.16:1 | AAA |
| #E8FBF1 | #0E3829 | 12.06:1 | AAA |
| #FFF0F1 | #47131E | 13.76:1 | AAA |
| #24212A | #F3F1EB | 14.02:1 | AAA |
| #514D58 | #F3F1EB | 7.28:1 | AAA |
| #686572 | #F3F1EB | 5.03:1 | AA |
| #FFFFFF | #E2B857 | 1.87:1 | FAIL — do not use |
| #241A0E | #E2B857 | 9.13:1 | FIX — approved gold button text |
| #E2B857 | #232330 | 8.29:1 | AAA |

**Gold checks:** gold text on midnight ink is 10.50:1. Dark ink on the gold gradient's darkest stop (#B8903A) is 5.77:1, so the complete gradient keeps AA for body-size button labels. Pure white on gold fails at 1.87:1; the corrected button foreground is #241A0E. Gold gradient text must never be white or ivory.

## 4. Distribution and placement
- 70% neutrals: background, graphite panels, text, quiet borders.
- 20% secondary surfaces: graphite elevation and muted emerald surfaces.
- 8% gold: primary CTA, selected odds, active tab marker, VIP insignia, boost icon.
- 2% semantic alerts: live, win/loss, warning, error and suspended states.

Gold may appear on primary CTAs, selected/active controls, important price boosts, premium membership marks and small decorative separators. Gold must not flood large backgrounds, replace live blue, imply wins, decorate every card, or be used for loss/error. Promo urgency must never use red; ruby is reserved for loss/error only.

## 5. Component specifications
- Primary button: gold gradient #F3DFA2 → #E2B857 → #B8903A; foreground #241A0E; hover brightness 1.06; pressed brightness .92 with 1px downshift; focus 3px #8BC5FF outline + 3px offset; disabled surface #232330 and text #898596.
- Secondary button: surface #232330, ivory text, border #393846; hover surface #2C2C3B; pressed #1A1A24; focus same 3px info outline; disabled as above.
- Ghost button: transparent, secondary text; hover #232330; pressed #1A1A24; focus same outline; disabled muted text.
- Odds: default #232330 / ivory / #393846 border; selected #403019 with #FFF9E9 text and #E2B857 border; up flash inset 2px #2FCB7E plus ↑; down flash inset 2px #E95B70 plus ↓; suspended muted text, dashed border, no pointer and explicit SUSPENDED label.
- Bet slip: surface 3, strong border; selected legs separated by quiet border; potential return in win green with “Potential return” label; never color stake or total as a win before settlement.
- Cards: surface 2, 1px border; hover border strong and subtle shadow, no gold fill.
- Tabs: inactive secondary text; active gold text + 2px gold underline; focus ring visible.
- Inputs: surface 1, primary text, strong border; focus 2px info outline; errors use ruby text/icon and explicit message.
- Badges: LIVE = blue 900 background + blue 100 text; NEW = gold 900 + gold 100; HOT = ruby 900 + ruby 100 only when “hot” means editorial popularity, not urgency (otherwise use gold).
- Toasts: success emerald 900 / emerald 50; error ruby 900 / ruby 50; info blue 900 / blue 50; icon + text required.
- Responsible-play band: muted emerald surface, light sage text, quiet green border; no gold pressure cues or red promotional copy.

## 6. Gradients and effects
- Gold CTA: linear-gradient(112deg,#F3DFA2 0%,#E2B857 48%,#B8903A 100%); foreground #241A0E.
- Glass panel: linear-gradient(145deg,rgba(35,35,48,.82),rgba(18,18,26,.88)); border rgba(243,223,162,.22).
- Live glow: 0 0 0 1px rgba(105,178,255,.28), 0 0 18px rgba(105,178,255,.18).
- Boost glow: 0 0 0 1px rgba(226,184,87,.32), 0 0 20px rgba(226,184,87,.20).
- Film grain opacity: .035 (3.5%); keep it subtle and disable for reduced-motion / low-power modes.

## 7. Color-blind safety
The semantic palette is redundant by design: win = ↑ + WIN label + emerald; loss = ↓ + LOSS label + ruby; live = dot + LIVE; boost = ✦ + BOOST; suspended = slash/lock + SUSPENDED. Protanopia and deuteranopia can reduce red/green separation, so never place win and loss states side-by-side as color-only swatches or use hue as the only signal. Tritanopia can affect blue/yellow discrimination, so LIVE and BOOST always retain text labels and distinct icons. Verify final production screenshots with a color-vision simulator; this design specifies redundant cues but is not a substitute for testing actual rendered components.

## 8. Alternate skins (same roles)
- Neon Night: base #100D1C, surface #19152A, raised #241D39, primary magenta #D45BFF, accent cyan #46E5EE, win #47D69A, loss #F06B91, live #65C8FF.
- Arctic Light: base #F4F8FB, surface #FFFFFF, raised #EAF0F6, primary royal blue #245BD7, accent mint #42C6A0, win #16865A, loss #B4233A, live #3279C5.
- Royal Emerald: base #090D0C, surface #111A16, raised #1B2921, primary champagne #D9C18A, accent felt green #0F4A35, win #45C78A, loss #D95A6B, live #75B8E8.

## 9. Exports
- `midnight-gold.css`: CSS custom properties and reusable component classes.
- `tailwind.midnight-gold.cjs`: Tailwind theme extension to merge into the project's config (there was no existing Tailwind config).
- `midnight-gold.tokens.json`: machine-readable design tokens.
- `index.html`: one-page interactive swatch sheet with dark/light preview, component samples, tonal ramps and contrast table.

## Implementation note
This is a standalone system package and approval artifact. Existing FBets pages should adopt these tokens in a controlled migration; the legacy global styles are not wholesale replaced here, so the brand system can be reviewed before broad rollout.
