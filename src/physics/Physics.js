// /**
//  * Physics.js
//  * ------------------------------------------------------------------
//  * Your badge is one rigid body (ribbon + connector + card) rotating
//  * around a fixed top pivot via `transform-origin: top center`. That
//  * means we only need a single-degree-of-freedom pendulum: an angle
//  * `theta` (0 = hanging straight down) and its angular velocity.
//  *
//  * theta'' = -(g / L) * sin(theta)   — real pendulum equation
//  *
//  * No x/y translation is needed — rotating around the fixed origin
//  * already swings the card sideways exactly like a real hanging rod,
//  * which matches how your JSX is already built.
//  * ------------------------------------------------------------------
//  */

// const DEG = 180 / Math.PI;

// export class PendulumPhysics {
//   constructor({
//     length = 420, // "effective" rod length in px — bigger = slower, heavier swing
//     gravity = 1500, // tuned for feel, not real-world units
//     angularDamping = 0.987, // per-frame velocity retention (closer to 1 = swings longer)
//   } = {}) {
//     this.length = length;
//     this.gravity = gravity;
//     this.angularDamping = angularDamping;

//     this.angle = 0; // radians
//     this.angularVelocity = 0;

//     // A small independent oscillator layered on top, purely for the
//     // subtle rotateX/rotateY "flutter" — decoupled from the real swing.
//     this.wobble = 0;
//     this.wobbleVelocity = 0;

//     this.isDragging = false;
//   }

//   get angleDeg() {
//     return this.angle * DEG;
//   }

//   /** While dragging, angle is derived directly from the pointer position relative to the pivot. */
//   setDragAngle(px, py) {
//     this.angle = Math.atan2(px, py); // atan2(x, y) so 0 = straight down
//     this.angularVelocity = 0;
//   }

//   /** Convert release velocity (px/s, from recent pointer deltas) into angular momentum. */
//   releaseWithVelocity(vx, vy) {
//     const cos = Math.cos(this.angle);
//     const sin = Math.sin(this.angle);
//     const tangential = vx * cos - vy * sin;
//     this.angularVelocity = tangential / this.length;
//     this.wobbleVelocity += tangential * 0.0015;
//   }

//   applyAngularImpulse(deltaOmega) {
//     this.angularVelocity += deltaOmega;
//   }

//   applyWobbleImpulse(deltaOmega) {
//     this.wobbleVelocity += deltaOmega;
//   }

//   step(dt) {
//     if (dt <= 0) return;
//     const clampedDt = Math.min(dt, 1 / 30); // avoid spiral-of-death on lag spikes

//     if (!this.isDragging) {
//       const angularAccel = -(this.gravity / this.length) * Math.sin(this.angle);
//       this.angularVelocity += angularAccel * clampedDt;
//       this.angularVelocity *= Math.pow(this.angularDamping, clampedDt * 60);
//       this.angle += this.angularVelocity * clampedDt;
//     }

//     const wobbleAccel = -this.wobble * 40;
//     this.wobbleVelocity += wobbleAccel * clampedDt;
//     this.wobbleVelocity *= Math.pow(0.965, clampedDt * 60);
//     this.wobble += this.wobbleVelocity * clampedDt;
//   }

//   get isSettled() {
//     return Math.abs(this.angularVelocity) < 0.004 && Math.abs(this.angle) < 0.006;
//   }
// }












/**
 * Physics.js
 * ------------------------------------------------------------------
 * Your badge is one rigid body (ribbon + connector + card) rotating
 * around a fixed top pivot via `transform-origin: top center`. That
 * means we only need a single-degree-of-freedom pendulum: an angle
 * `theta` (0 = hanging straight down) and its angular velocity.
 *
 * theta'' = -(g / L) * sin(theta)   — real pendulum equation
 *
 * No x/y translation is needed — rotating around the fixed origin
 * already swings the card sideways exactly like a real hanging rod,
 * which matches how your JSX is already built.
 * ------------------------------------------------------------------
 */

const DEG = 180 / Math.PI;

export class PendulumPhysics {
  constructor({
    length = 420, // "effective" rod length in px — bigger = slower, heavier swing
    gravity = 1500, // tuned for feel, not real-world units
    angularDamping = 0.987, // per-frame velocity retention (closer to 1 = swings longer)
  } = {}) {
    this.length = length;
    this.gravity = gravity;
    this.angularDamping = angularDamping;

    this.angle = 0; // radians
    this.angularVelocity = 0;

    // A small independent oscillator layered on top, purely for the
    // subtle rotateX/rotateY "flutter" — decoupled from the real swing.
    this.wobble = 0;
    this.wobbleVelocity = 0;

    this.isDragging = false;
  }

  get angleDeg() {
    return this.angle * DEG;
  }

  /** While dragging, angle is derived directly from the pointer position relative to the pivot. */
  setDragAngle(px, py) {
    this.angle = Math.atan2(px, py); // atan2(x, y) so 0 = straight down
    this.angularVelocity = 0;
  }

  /** Convert release velocity (px/s, from recent pointer deltas) into angular momentum. */
  releaseWithVelocity(vx, vy) {
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);
    const tangential = vx * cos - vy * sin;
    this.angularVelocity = tangential / this.length;
    this.wobbleVelocity += tangential * 0.0015;
  }

  applyAngularImpulse(deltaOmega) {
    this.angularVelocity += deltaOmega;
  }

  applyWobbleImpulse(deltaOmega) {
    this.wobbleVelocity += deltaOmega;
  }

  step(dt) {
    if (dt <= 0) return;
    const clampedDt = Math.min(dt, 1 / 30); // avoid spiral-of-death on lag spikes

    if (!this.isDragging) {
      const angularAccel = -(this.gravity / this.length) * Math.sin(this.angle);
      this.angularVelocity += angularAccel * clampedDt;
      this.angularVelocity *= Math.pow(this.angularDamping, clampedDt * 60);
      this.angle += this.angularVelocity * clampedDt;
    }

    const wobbleAccel = -this.wobble * 40;
    this.wobbleVelocity += wobbleAccel * clampedDt;
    this.wobbleVelocity *= Math.pow(0.965, clampedDt * 60);
    this.wobble += this.wobbleVelocity * clampedDt;
  }

  get isSettled() {
    return Math.abs(this.angularVelocity) < 0.004 && Math.abs(this.angle) < 0.006;
  }
}