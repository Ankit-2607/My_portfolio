

// import gsap from "gsap";

// /**
//  * animations.js
//  * ------------------------------------------------------------------
//  * Two coupled pendulums now, not one rigid rotation:
//  *   - `cardPhysics`   — the heavy body. Full pendulum physics, drives
//  *                        every interaction (drag, flick, wind).
//  *   - `ribbonPhysics` — the light body. Stiffer/faster settling, has
//  *                        no gravity/interaction of its own — it's
//  *                        just pulled toward the card's current angle
//  *                        with a bit of lag each frame, like real
//  *                        tension traveling up a lanyard.
//  * That lag between the two is what makes them visibly swing as
//  * separate things instead of one rigid rod.
//  * ------------------------------------------------------------------
//  */

// /**
//  * Entrance hand-off: both pendulums are left at the exact angle the
//  * drop tween ended on (0°) and only given a small angular *velocity*
//  * kick. Nothing snaps or jumps — the swing grows smoothly out of the
//  * drop instead of teleporting to an angle.
//  */
// export function seedEntranceSwing(cardPhysics, ribbonPhysics) {
//   const direction = Math.random() < 0.5 ? -1 : 1;
//   cardPhysics.angle = 0;
//   cardPhysics.angularVelocity = direction * gsap.utils.random(0.45, 0.7);
//   ribbonPhysics.angle = 0;
//   ribbonPhysics.angularVelocity = 0; // it'll follow the card via coupling
// }

// /**
//  * Persistent GSAP ticker loop stepping BOTH pendulums each frame, with
//  * the ribbon lightly coupled to (lagging behind) the card.
//  * @param {number} couplingStrength - how eagerly the ribbon chases the
//  *   card's angle. Lower = more lag/independence, higher = more rigid.
//  */
// export function runCoupledPhysicsLoop(cardPhysics, ribbonPhysics, onUpdate, couplingStrength = 10) {
//   let last = performance.now();
//   const tick = () => {
//     const now = performance.now();
//     const dt = Math.min((now - last) / 1000, 1 / 30);
//     last = now;

//     if (!ribbonPhysics.isDragging) {
//       const diff = cardPhysics.angle - ribbonPhysics.angle;
//       ribbonPhysics.angularVelocity += diff * couplingStrength * dt;
//     }
//     ribbonPhysics.step(dt);
//     cardPhysics.step(dt);
//     onUpdate(cardPhysics, ribbonPhysics);
//   };
//   gsap.ticker.add(tick);
//   return () => gsap.ticker.remove(tick);
// }

// /** Tiny perpetual sway once settled, so the badge never looks frozen. */
// export function startIdleBreathing(physics) {
//   const interval = setInterval(() => {
//     if (physics.isSettled && !physics.isDragging) {
//       physics.applyAngularImpulse(gsap.utils.random(-0.01, 0.01));
//       physics.applyWobbleImpulse(gsap.utils.random(-0.12, 0.12));
//     }
//   }, 2600);
//   return () => clearInterval(interval);
// }

// /** Gentle "wind gust" impulse every 20-30s. */
// export function startWindGusts(physics) {
//   let cancelled = false;
//   let timeoutId;
//   const schedule = () => {
//     const delay = gsap.utils.random(20000, 30000);
//     timeoutId = setTimeout(() => {
//       if (cancelled) return;
//       if (!physics.isDragging) {
//         const gust = gsap.utils.random(0.3, 0.6) * (Math.random() < 0.5 ? -1 : 1);
//         physics.applyAngularImpulse(gust);
//         physics.applyWobbleImpulse(gust * 0.4);
//       }
//       schedule();
//     }, delay);
//   };
//   schedule();
//   return () => {
//     cancelled = true;
//     clearTimeout(timeoutId);
//   };
// }

// /** Playful double-click swing. */
// export function playDoubleClickSwing(physics) {
//   const direction = Math.random() < 0.5 ? -1 : 1;
//   physics.applyAngularImpulse(direction * gsap.utils.random(1.4, 1.9));
//   physics.applyWobbleImpulse(direction * gsap.utils.random(0.5, 0.8));
// }





import gsap from "gsap";

/**
 * animations.js
 * ------------------------------------------------------------------
 * Two coupled pendulums now, not one rigid rotation:
 *   - `cardPhysics`   — the heavy body. Full pendulum physics, drives
 *                        every interaction (drag, flick, wind).
 *   - `ribbonPhysics` — the light body. Stiffer/faster settling, has
 *                        no gravity/interaction of its own — it's
 *                        just pulled toward the card's current angle
 *                        with a bit of lag each frame, like real
 *                        tension traveling up a lanyard.
 * That lag between the two is what makes them visibly swing as
 * separate things instead of one rigid rod.
 * ------------------------------------------------------------------
 */

/**
 * Entrance hand-off: both pendulums are left at the exact angle the
 * drop tween ended on (0°) and only given a small angular *velocity*
 * kick. Nothing snaps or jumps — the swing grows smoothly out of the
 * drop instead of teleporting to an angle.
 */
export function seedEntranceSwing(cardPhysics, ribbonPhysics) {
  const direction = Math.random() < 0.5 ? -1 : 1;
  cardPhysics.angle = 0;
  cardPhysics.angularVelocity = direction * gsap.utils.random(0.45, 0.7);
  ribbonPhysics.angle = 0;
  ribbonPhysics.angularVelocity = 0; // it'll follow the card via coupling
}

/**
 * Persistent GSAP ticker loop stepping BOTH pendulums each frame, with
 * the ribbon lightly coupled to (lagging behind) the card.
 * @param {number} couplingStrength - how eagerly the ribbon chases the
 *   card's angle. Lower = more lag/independence, higher = more rigid.
 */
export function runCoupledPhysicsLoop(cardPhysics, ribbonPhysics, onUpdate, couplingStrength = 10) {
  let last = performance.now();
  const tick = () => {
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;

    if (!ribbonPhysics.isDragging) {
      const diff = cardPhysics.angle - ribbonPhysics.angle;
      ribbonPhysics.angularVelocity += diff * couplingStrength * dt;
    }
    ribbonPhysics.step(dt);
    cardPhysics.step(dt);
    onUpdate(cardPhysics, ribbonPhysics, dt);
  };
  gsap.ticker.add(tick);
  return () => gsap.ticker.remove(tick);
}

/** Tiny perpetual sway once settled, so the badge never looks frozen. */
export function startIdleBreathing(physics) {
  const interval = setInterval(() => {
    if (physics.isSettled && !physics.isDragging) {
      physics.applyAngularImpulse(gsap.utils.random(-0.01, 0.01));
      physics.applyWobbleImpulse(gsap.utils.random(-0.12, 0.12));
    }
  }, 2600);
  return () => clearInterval(interval);
}

/** Gentle "wind gust" impulse every 20-30s. */
export function startWindGusts(physics) {
  let cancelled = false;
  let timeoutId;
  const schedule = () => {
    const delay = gsap.utils.random(20000, 30000);
    timeoutId = setTimeout(() => {
      if (cancelled) return;
      if (!physics.isDragging) {
        const gust = gsap.utils.random(0.3, 0.6) * (Math.random() < 0.5 ? -1 : 1);
        physics.applyAngularImpulse(gust);
        physics.applyWobbleImpulse(gust * 0.4);
      }
      schedule();
    }, delay);
  };
  schedule();
  return () => {
    cancelled = true;
    clearTimeout(timeoutId);
  };
}

/** Playful double-click swing. */
export function playDoubleClickSwing(physics) {
  const direction = Math.random() < 0.5 ? -1 : 1;
  physics.applyAngularImpulse(direction * gsap.utils.random(1.4, 1.9));
  physics.applyWobbleImpulse(direction * gsap.utils.random(0.5, 0.8));
}